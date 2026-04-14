// 1. Playwright'ın temel test fonksiyonunu içeri aktarıyoruz.
import { test } from '@playwright/test';

import { expect } from '@playwright/test';

// 2. Testimizi tanımlıyoruz. 'Amazon Git' testimizin adıdır.
test('Amazon Git', async ({ page }) => {

  test.setTimeout(60000);
  
  // 3. Tarayıcıya belirtilen adrese gitmesini söylüyoruz.
  // 'await' komutu, sayfa tamamen yüklenene kadar bekle demek.
  await page.goto('https://www.amazon.com.tr');

  // Sayfayı görmemiz için 5 saniye bekle (Kanka normalde testlerde bu kullanılmaz ama şimdilik görelim diye)
  await page.waitForTimeout(5000);

  await page.getByRole('button', { name: 'Kabul et' }).click();

  await page.waitForTimeout(1000);

  // x: 0 (yatay), y: 500 (dikey) piksel aşağı kaydır
await page.mouse.wheel(0, 500);

await page.waitForTimeout(1000);

// Sayfayı en tepeye ışınlar
await page.evaluate(() => window.scrollTo(0, 0));

await page.waitForTimeout(1000);

await page.getByRole('searchbox', { name: 'Amazon.com.tr araması yapın' }).click();

// 2. İçine istediğin ürünü yazdır
await page.getByRole('searchbox', { name: 'Amazon.com.tr araması yapın' }).fill('iPhone 15 Pro Max');

// 3. Klavyeden Enter'a bas
await page.keyboard.press('Enter');

await page.waitForTimeout(3500);


await page.mouse.wheel(0, 200);

// 1. Filtreye tıklarken 'Zaman aşımı bekleme' diyoruz (noWaitAfter)
  // Çünkü Amazon sayfayı tam yenilemiyor, sadece içeriği güncelliyor.
  await page.getByRole('link', { name: 'TL ve Üzeri' }).click({ force: true, noWaitAfter: true });

  // 2. Sayfanın kendine gelmesi için 3 saniye mola (Kritik!)
  await page.waitForTimeout(3000);

  // 3. Renk seçeneğine tıklama (Bazen locator değişebilir, garantici olalım)
  await page.locator('.colorsprite').first().click({ force: true });

  // 4. 'Seçenekleri gör' butonu için bekle ve tıkla
  // Videoda gördüğüm kadarıyla buton tam yüklenmeden basmaya çalışıyor
  const secenekleriGor = page.getByRole('link', { name: 'Seçenekleri gör' });
  
  // Butonun görünür olmasını bekle
  await secenekleriGor.waitFor({ state: 'visible' }); 
  await secenekleriGor.first().click({ force: true });

  console.log("Kanka seçenekler sayfasına başarıyla ulaştık!");

  // 'Satın Alma Seçeneklerini Gör' butonu ekranda görünür olana kadar bekle
await page.getByRole('link', { name: 'Satın Alma Seçeneklerini Gör' }).waitFor({ state: 'visible' });

await page.getByRole('link', { name: 'Satın Alma Seçeneklerini Gör' }).first().click({ force: true });

await page.waitForTimeout(4000);

// aria-label içinde "Sepete ekle" geçen herhangi bir elemente tıkla
await page.locator('input[aria-label*="Sepete ekle"]').click();

await expect(page.getByRole('heading', { name: 'Sepete eklendi' })).toBeVisible();

await page.locator('input[name="proceedToRetailCheckout"]').click();

// /.../i içindeki 'i' harfi büyük-küçük harf duyarlılığını da kaldırır, kafa rahat olur.
await page.getByRole('heading', { name: /Giriş yapın veya hesap oluşturun/i }).waitFor({ state: 'visible' });

await page.locator('#ap_email_login').fill('gunesenes.38@gmail.com');

// Hem submit tipi hem de bu özel ID referansına sahip inputu bul
await page.locator('input[type="submit"][aria-labelledby="continue-announce"]').click();

await page.locator('#signInSubmit').waitFor({ state: 'visible' });

// 2. Şifreni yazdır (Senin verdiğin örneğe göre format bu)
await page.locator('#ap_password').fill('cesibam38');

// 3. Giriş yap butonuna tıkla
await page.locator('#signInSubmit').click();

await page.waitForTimeout(4000);


// 4. Test bloğunu kapatıyoruz.
});