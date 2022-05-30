# Приложение News.
Приложение для публикации и чтения новостей.
У пользователей есть 3 роли: admin, writer, reader. 
Админы могут просматривать пользователей, менять им роли, удалять новости. Также они могут редактировать список тегов.
Писатели могут создавать посты и черновики постов. Черновики не будут опубликованы в ленте.
Читатели могут только просматривать новости. Для просмотренных новостей необходимо помечать их прочитанными.
У новостей есть теги. Пользователи могут подписаться на какие-то теги и переключить новостную вкладку 
на вкладку подписок (отфильтрованные по тегам новости) (см. аналог Пикабу).
На странице тегов должна быть реализована пагинация (серверная), 
могут быть реализованы фильтры по просмотренным/автору/тексту(по заголовку)/тегам.

Для удобства в бекенде заранее добавлены пользователи admin-admin, writer-writer, reader-reader. Также у writer добавлено 2 новости (одна - черновик). Также есть 4 тега ['general', 'politics', 'news', 'art']

***      
Запуск сервера cd server && npm run dev:start     
Запуск клиента cd client && npm start
