describe('Проверка авторизации', function () {

   beforeEach('Начало теста', function () {
         cy.visit('/');
         cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');
           });

   it('Верный пароль и верный логин', function () {
       cy.get('#mail').type('german@dolnikov.ru');      // ввел правильный логин
       cy.get('#pass').type('qa_one_love1');            // ввел правильный Пароль
       cy.get('#loginButton').click();                   // Нажать войти
       cy.get('#messageHeader').contains('Авторизация прошла успешно');  //Проверяю что после авторизации выдан текст
       cy.get('#messageHeader').should('be.visible');   // Текс виден пользователю
       cy.get('#exitMessageButton > .exitIcon').should('be.visible');  // Есть крестик и он виден пользователю
    })

    it('Проверка логики восстановления', function () {
       cy.get('#forgotEmailButton').click();
       cy.get('#mailForgot').type('german@dolnikov.ru');      // ввел правильный логин
       cy.get('#restoreEmailButton').click();            // Нажать отправить код

       cy.wait(4000);

       cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail');  //Проверяю что после отправки кода выдает текст
       cy.get('#messageHeader').should('be.visible');   // Текст виден пользователю
       cy.get('#exitMessageButton > .exitIcon').should('be.visible');  // Есть крестик и он виден пользователю
    })

    it('Неверный пароль и верный логин', function () {
       cy.get('#mail').type('german@dolnikov.ru');      // ввел правильный логин
       cy.get('#pass').type('qa_one_love23');            // ввел неправильный Пароль
       cy.get('#loginButton').click();                   // Нажать войти
       cy.get('#messageHeader').contains('Такого логина или пароля нет');  //Проверяю что после авторизации выдан текст
       cy.get('#messageHeader').should('be.visible');   // Текс виден пользователю
       cy.get('#exitMessageButton > .exitIcon').should('be.visible');  // Есть крестик и он виден пользователю
    })

    it('Верный пароль и неверный логин', function () {
       cy.get('#mail').type('Maxsim@autotest.ru');      // ввел неправильный логин
       cy.get('#pass').type('qa_one_love1');            // ввел правильный Пароль
       cy.get('#loginButton').click();                   // Нажать войти

       cy.get('#messageHeader').contains('Такого логина или пароля нет');  //Проверяю что после авторизации выдан текст
       cy.get('#messageHeader').should('be.visible');   // Текс виден пользователю
       cy.get('#exitMessageButton > .exitIcon').should('be.visible');  // Есть крестик и он виден пользователю
    })

    it('Верный пароль и вводим логин без @', function () {
       cy.get('#mail').type('germandolnikov.ru');      // ввел логин без @
       cy.get('#pass').type('qa_one_love1');            // ввел правильный Пароль
       cy.get('#loginButton').click();                   // Нажать войти

       cy.get('#messageHeader').contains('Нужно исправить проблему валидации');  //Проверяю что после авторизации выдан текст
       cy.get('#messageHeader').should('be.visible');   // Текс виден пользователю
    })

     it('Проверка поведения к вводу верного пароля и логин со строчными буквами', function () {
       cy.get('#mail').type('GerMan@Dolnikov.ru');      // ввел логин со строчными буквами
       cy.get('#pass').type('qa_one_love1');            // ввел правильный Пароль
       cy.get('#loginButton').click();                  // Нажать войти

       cy.get('#messageHeader').contains('Авторизация прошла успешно');   //Проверяю на сопадение текст
       cy.get('#messageHeader').should('be.visible');   // Текс виден пользователю
       cy.get('#exitMessageButton > .exitIcon').should('be.visible');       // Есть крестик и он виден пользователю
    })

})

// + 1 Напиши проверку на позитивный кейс авторизации:
// + а) Ввести правильный логин
// + б) Ввести правильный пароль
// + в) Нажать войти
// + г) Проверить нужный текст и наличие кнопки крестик

// + 2 Напиши автотест на проверку логики восстановления пароля:
// + а) Нажать «Забыли пароль»
// + б) Ввести любой имейл
// + в) Проверка, что получили нужный текст и есть кнопка крестика

// + 3 Напиши проверку на негативный кейс авторизации:
// + а) Ввести правильный логин
// + б) Ввести НЕправильный пароль
// + в) Нажать войти
// + г) Проверить нужный текст и наличие кнопки крестик

// + 4 Напиши проверку на негативный кейс авторизации:
// + а) Ввести НЕправильный логин
// + б) Ввести правильный пароль
// + в) Нажать войти
// + г) Проверить нужный текст и наличие кнопки крестик

// + 5 Напиши проверку на негативный кейс валидации:
// + а) Ввести логин без @
// + б) Ввести правильный пароль
// + в) Нажать войти
// + г) Проверить, что получаем текст с ошибкой

// + Напиши проверку на приведение к строчным буквам в логине:
// + а) Ввести логин GerMan@Dolnikov.ru
// + б) Ввести правильный пароль
// + в) Нажать войти
// + г) Проверить, что авторизация успешна (текст именно «Авторизация прошла успешно» и наличие кнопки крестик)