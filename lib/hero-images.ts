export const heroImages:Record<string,{desktop:string;mobile:string}>={
 'home':{desktop:'/assets/heroes/home-desktop.jpg',mobile:'/assets/heroes/home-mobile.jpg'},
 'company':{desktop:'/assets/giunchan-rnd-team.jpg',mobile:'/assets/giunchan-rnd-team.jpg'},
 'technology':{desktop:'/assets/mushroom-mycelia-research.jpg',mobile:'/assets/mushroom-mycelia-research.jpg'},
 'business':{desktop:'/assets/heroes/business-desktop.jpg',mobile:'/assets/heroes/business-mobile.jpg'},
 'brands':{desktop:'/assets/product-premium.webp',mobile:'/assets/product-premium.webp'},
 'insight':{desktop:'/assets/culture-white.webp',mobile:'/assets/culture-white.webp'},
 'newsroom':{desktop:'/assets/giunchan-research-sample-review.jpg',mobile:'/assets/giunchan-research-sample-review.jpg'},
};
export const heroRoutes:Record<string,string>={
 '/':'home','/company':'company','/technology':'technology','/business':'business','/brands':'brands','/insight':'insight','/newsroom':'newsroom',
};
export function getHeroImages(path:string){const section=path==='/'?'home':path.split('/')[1];return heroImages[heroRoutes[path]||section]||heroImages.home;}
