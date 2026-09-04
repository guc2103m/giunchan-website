export const heroImages:Record<string,{desktop:string;mobile:string}>={
 'home':{desktop:'/assets/heroes/home-desktop.jpg',mobile:'/assets/heroes/home-mobile.jpg'},
 'company':{desktop:'/assets/heroes/company-desktop.jpg',mobile:'/assets/heroes/company-mobile.jpg'},
 'technology':{desktop:'/assets/heroes/technology-desktop.jpg',mobile:'/assets/heroes/technology-mobile.jpg'},
 'patents':{desktop:'/assets/heroes/patents-desktop.jpg',mobile:'/assets/heroes/patents-mobile.jpg'},
 'papers':{desktop:'/assets/heroes/papers-desktop.jpg',mobile:'/assets/heroes/papers-mobile.jpg'},
 'clinical':{desktop:'/assets/heroes/clinical-desktop.jpg',mobile:'/assets/heroes/clinical-mobile.jpg'},
 'business':{desktop:'/assets/heroes/business-desktop.jpg',mobile:'/assets/heroes/business-mobile.jpg'},
 'ingredient':{desktop:'/assets/heroes/ingredient-desktop.jpg',mobile:'/assets/heroes/ingredient-mobile.jpg'},
 'development':{desktop:'/assets/heroes/development-desktop.jpg',mobile:'/assets/heroes/development-mobile.jpg'},
 'brand-story':{desktop:'/assets/heroes/brand-story-desktop.png',mobile:'/assets/heroes/brand-story-mobile.png'},
 'brand-products':{desktop:'/assets/heroes/brand-products-desktop.png',mobile:'/assets/heroes/brand-products-mobile.png'},
 'insight':{desktop:'/assets/heroes/insight-desktop.jpg',mobile:'/assets/heroes/insight-mobile.jpg'},
 'mycelia':{desktop:'/assets/heroes/mycelia-desktop.jpg',mobile:'/assets/heroes/mycelia-mobile.jpg'},
 'news':{desktop:'/assets/heroes/news-desktop.jpg',mobile:'/assets/heroes/news-mobile.jpg'},
};
export const heroRoutes:Record<string,string>={
 '/':'home','/company':'company','/technology':'technology','/technology/patents':'patents','/technology/publications':'papers','/technology/clinical-study':'clinical','/business':'business','/business/ingredient':'ingredient','/business/product-development':'development','/brands':'brand-story','/brands/dodoon':'brand-story','/brands/dodoon/products':'brand-products','/insight':'insight','/insight/gmk':'ingredient','/insight/mycelia':'mycelia','/newsroom':'news','/newsroom/news':'news','/newsroom/issues':'clinical',
};
export function getHeroImages(path:string){const key=heroRoutes[path]||(path.startsWith('/brands/')?'brand-products':path.startsWith('/insight/gmk/')?'ingredient':path.startsWith('/insight/mycelia/')?'mycelia':'home');return heroImages[key];}

