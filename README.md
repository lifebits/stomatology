# Изоморфное приложение написанное на MEAN стэке

Фронтэнд часть собрана с помощью angular-cli и развернута на github pages - https://pages.github.com/

Бэкенд часть собрана с помощью webpack и развернута на облачной PaaS платформе heroku - https://www.heroku.com/

В качестве базы данных используется mongodb, которая храниться на серверах mLab - https://mlab.com/welcome/

## Описание приложения

Проект создан для демонстрации архитектуры изоморфного приложения под нужды среднего и малого бизнеса, когда все сервисы компании, включая ее сайт, находятся в едином приложении.

В текущем приложении реализованы три основных модуля:
- многостраничный сайт компании
- сервис аналитики для бизнеса
- сервис crm для бизнеса

Данные собираются из журнала регистрации(xlsx файл), который заполняется сотрудниками компании и далее парсится подготовленным парсером, с валидацией полей. Далее информация складывается в mongodb в соответствующие коллекции и используется для аналитики и создания единой базы пациентов.

[live preview](https://lifebits.github.io/stomatology/analytics) (первый запуск приложения будет холодным и потребуется доп время на первый запрос)
