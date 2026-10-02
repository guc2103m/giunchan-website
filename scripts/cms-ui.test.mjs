// Run with the installed Playwright runtime; all account/database traffic is mocked.
import {createRequire} from 'node:module';
import {spawn} from 'node:child_process';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require(require.resolve('playwright',{paths:[process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES]}));
const server=spawn(process.execPath,['scripts/serve.mjs'],{stdio:['ignore','pipe','inherit']});
await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject);server.once('exit',code=>reject(new Error('server exit '+code)));});
let browser;try{browser=await chromium.launch({headless:true});}catch(error){server.kill();throw error;}
try{
 const page=await browser.newPage({viewport:{width:1280,height:900}});const errors=[];page.on('pageerror',error=>errors.push(error.message));
 let posts=[],assets=[],requests=[];
 await page.route('**/api/content?action=config',route=>route.fulfill({json:{url:'https://test.supabase.co',key:'test',reservedSlugs:['are-mushrooms-plants']}}));
 await page.route('https://test.supabase.co/**',async route=>{const req=route.request(),url=new URL(req.url()),method=req.method();requests.push({path:url.pathname,method});let json=[];
  if(url.pathname==='/auth/v1/token')json={access_token:'test-access',refresh_token:'test-refresh',expires_in:3600};
  else if(url.pathname==='/auth/v1/user')json={id:'admin'};
  else if(url.pathname==='/rest/v1/content_admins')json=[{user_id:'admin'}];
  else if(url.pathname==='/rest/v1/posts'){if(method==='POST'){const body=req.postDataJSON();posts.push({...body,id:'new-post',updated_at:new Date().toISOString()});json=[posts.at(-1)];}else if(method==='PATCH'){posts[0]={...posts[0],...req.postDataJSON(),updated_at:new Date().toISOString()};json=[posts[0]];}else json=posts;}
  else if(url.pathname==='/rest/v1/post_assets'){if(method==='POST'){assets.push({...req.postDataJSON(),id:'asset-'+assets.length});json=[assets.at(-1)];}else json=assets;}
  else if(url.pathname.startsWith('/storage/v1/object/authenticated/'))return route.fulfill({contentType:'image/png',body:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jWeUAAAAASUVORK5CYII=','base64')});
  await route.fulfill({json});
 });
 await page.goto('http://127.0.0.1:4173/admin/');await page.locator('#password').fill('test-only-password');await page.locator('#login-form button').click();await page.locator('#dashboard').waitFor({state:'visible'});
 await page.locator('#new-post').click();await page.locator('[name=title]').fill('버섯균사체의 세계');await page.locator('[name=slug]').fill('cms-ui-test');await page.locator('[name=summary]').fill('균사와 균사체의 차이를 알아봅니다.');await page.locator('#blocks textarea').fill('첫 번째 문단입니다.\n두 번째 줄입니다.');
 await page.locator('[data-add=heading]').click();await page.locator('#blocks input').fill('균사체란 무엇일까요?');await page.locator('[data-add=paragraph]').click();await page.locator('#blocks textarea').last().fill('가는 균사들이 모여 균사체를 이룹니다.');
 await page.locator('#cover-upload').setInputFiles({name:'test.png',mimeType:'image/png',buffer:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jWeUAAAAASUVORK5CYII=','base64')});await page.locator('#cover-preview').waitFor({state:'visible'});assert.equal(posts[0].status,'draft');
 await page.locator('#save-draft').click();await page.waitForFunction(()=>document.querySelector('#message').textContent==='초안을 저장했습니다.');
 await page.locator('#preview').click();await page.locator('#preview-dialog').waitFor({state:'visible'});assert.ok(await page.locator('#preview-body').textContent().then(x=>x.includes('가는 균사')));await page.locator('#preview-width').selectOption('390px');await page.screenshot({path:'review/cms-test-preview.png',fullPage:true});await page.locator('#preview-close').click();
 await page.locator('#publish').click();await page.waitForFunction(()=>document.querySelector('#message').textContent.startsWith('게시했습니다.'));assert.equal(posts[0].status,'published');assert.equal(posts[0].details.ever_published,true);assert.equal(await page.locator('[name=slug]').getAttribute('readonly'),'');
 await page.locator('#back').click();await page.locator('#post-list button').waitFor();assert.ok((await page.locator('#post-list').textContent()).includes('게시됨'));await page.screenshot({path:'review/cms-test-list.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});await page.locator('#post-list button').click();const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);assert.equal(overflow,false);await page.screenshot({path:'review/cms-test-editor-mobile.png',fullPage:true});assert.deepEqual(errors,[]);assert.ok(requests.some(r=>r.path.startsWith('/storage/')&&r.method==='POST'));
 console.log('PASS: 관리자 화면 로그인·초안·이미지·미리보기·게시·카드 목록·모바일 (mock API)');
}finally{await browser.close();server.kill();}
