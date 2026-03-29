import { test, expect } from '@playwright/test';


test('invalid login', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
  await page.locator('#username').fill("Special");
  await page.locator('#password').fill("12345678");
  await page.locator('#signInBtn').click();
  const text = await page.locator('[style = "display: block;"]').textContent();
  console.log("Error MSG is : " + text);
  await expect(page.locator('[style = "display: block;"]')).toContainText("Incorrect");
}
);

test('valid login and get first product', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
  await page.locator('#username').fill("rahulshettyacademy");
  await page.locator('#password').fill("learning");
  await page.locator('#signInBtn').click();
  const text = await page.locator('.card-title a').nth(0).textContent();
  console.log(text);
  await expect(page.locator('.card-title a').nth(0)).toContainText("iphone");
}
);


//using wait for 
// test('valid login and get all products' , async ({ page }) => {
// await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
// console.log(await page.title());
// await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
// await page.locator('#username').fill("rahulshettyacademy");
// await page.locator('#password').fill("learning");
// await page.locator('#signInBtn').click();
// await page.locator('.card-title a').first().waitFor();
// const text = await page.locator('.card-title a').allTextContents();
// console.log(text);
// }
// );

//using assertion to wait for element 
test('valid login and get all products', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
  await page.locator('#username').fill("rahulshettyacademy");
  await page.locator('#password').fill("Learning@830$3mK2");
  await page.locator('#signInBtn').click();
  await expect(page.locator('.card-title a').first()).toBeVisible();
  const text = await page.locator('.card-title a').allTextContents();
  console.log(text);
}
);

test('staticDropDown TC', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
  await page.locator('#username').fill("rahulshettyacademy");
  await page.locator('#password').fill("learning");

  //static dropdown
  await page.locator('select.form-control').selectOption('consult');
  // await page.pause();
}
);

test('radioButton & checkBox TC', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
  await page.locator('#username').fill("rahulshettyacademy");
  await page.locator('#password').fill("learning");

  //radio button
  await page.locator('span.radiotextsty').last().click();
  await expect(page.locator('span.radiotextsty').last()).toBeChecked();

  await page.locator('#okayBtn').click();

  //checkbox
  await page.locator('#terms').click();
  await expect(page.locator('#terms')).toBeChecked();
  await page.locator('#terms').uncheck();
  await expect(page.locator('#terms')).not.toBeChecked();
  //  expect(await page.locator('#terms').isChecked()).toBeFalsy();
  // await page.pause();
}
);

test('blink TC', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
  await page.locator('#username').fill("rahulshettyacademy");
  await page.locator('#password').fill("learning");
  await expect(page.locator('[target = "_blank"]')).toHaveAttribute("class", "blinkingText");
}
);


test('child window handle', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  // await page.locator('[target = "_blank"]').click();
  // const newPage = context.waitForEvent('page');

  const [documentPage] = await Promise.all([
    context.waitForEvent('page'),
    page.locator('[target = "_blank"]').click()
  ]);

  const text = await documentPage.locator('.im-para.red').textContent();
  console.log("Text from child window is : " + text);
  const arrayText = text.split("at");
  const email = arrayText[1].trim().split(" ")[0];
  console.log("Extracted email is : " + email);
}
);



test('valueInput method TC', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.locator('#username').fill("specialOmar");
  console.log("filled username is " + await page.locator('#username').inputValue());
  // console.log("filled username is " + await page.locator('#username').textContent());
}
);


test('calendar TC', async ({ page }) => {
  const day = '15';
  const monthNumber = '7';
  const year = '2028';
  const expectedList = [monthNumber, day, year];


  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  await page.locator('.react-date-picker__calendar-button__icon.react-date-picker__button__icon').click();
  await page.locator('.react-calendar__navigation__label').click();
  await page.locator('.react-calendar__navigation__label').click();
  await page.getByText(year).click();
  await page.locator('.react-calendar__tile').nth(Number(monthNumber) - 1).click(); //nth is zero based index
  await page.locator("//abbr[text()='" + day + "']").click();

  const inputs = page.locator('.react-date-picker__inputGroup__input')

  for (let i = 0; i < expectedList.length; i++) {
    const value = await inputs.nth(i).getAttribute('value');
    // const value = await inputs.nth(i).inputValue();

    expect(value).toEqual(expectedList[i]);

  }
});

test('Navigation TC', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await page.goto("https://www.google.com/");
  await page.goBack();
  await page.goForward();
  await page.goBack();

  await expect(page.locator('#displayed-text')).toBeVisible();
  await page.locator('#hide-textbox').click();
  await expect(page.locator('#displayed-text')).not.toBeVisible();
});


test('popup TC', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  page.on('dialog', dialog => { dialog.accept(); });
  await page.locator('#confirmbtn').click();
  await expect(page.locator('#displayed-text')).toBeVisible();
  await page.locator('#hide-textbox').click();
  await expect(page.locator('#displayed-text')).not.toBeVisible();
});


test('hover TC', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await page.locator('#mousehover').hover();
});



test('visual TC', async ({ page }) => {

  await page.goto("https://google.com");
  await expect(page).toHaveScreenshot('baselineGoogle.png');
});