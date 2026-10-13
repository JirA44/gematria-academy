const {test,expect}=require('@playwright/test');
test('page d’accueil charge et affiche un contenu',async({page})=>{
 const failures=[];
 page.on('pageerror',error=>failures.push(error.message));
 const response=await page.goto('/index.html');
 expect(response.status()).toBe(200);
 await expect(page.locator('body')).not.toBeEmpty();
 await expect(page.locator('body')).toBeVisible();
 expect(failures,'erreurs JavaScript non interceptées').toEqual([]);
});
test('interface accessible en vue mobile',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 const response=await page.goto('/index.html');
 expect(response.status()).toBe(200);
 await expect(page.locator('body')).toBeVisible();
});
