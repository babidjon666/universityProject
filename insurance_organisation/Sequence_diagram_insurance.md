Акторы:

Пользователь - человек без роли(иностранный гражданин, администратор, сотрудник страховой компании).

Иностранный гражданин - человек, которому требуется полис ОМС/ДМС.

Администратор системы - работник предприятия, администрирует заявки.

Сотрудник страховой компании - работник предприятия, имеет доступ к списку заявок, обрабатывает заявки, принимает решение о выдаче полисов.

_______________________________________________________________________

Диаграмма последовательности: Вход в систему.

![](https://github.com/babidjon666/universityProject/blob/main/Cache/sd_insurance_login.jpg)

Пользователь авторизируется в системе (если у него есть аккаунт, если нет, то регистрируется).
_______________________________________________________________________

Диаграмма последовательности: Заполнение заявки для получаения полиса.

![](https://github.com/babidjon666/universityProject/blob/main/Cache/sd_insurance_make_request.jpg)

Иностранный гражданин создает заявку на получение полиса.
_______________________________________________________________________

Диаграмма последовательности: Проверка заявок.

![](https://github.com/babidjon666/universityProject/blob/main/Cache/sd_insurance_check_requests.jpg)

Администратор открывает список заявок, система выдает ему этот список, после чего он выбирает заявку, в зависимости от условий принимает заявки или изменяет ее условия.

_______________________________________________________________________

Диаграмма последовательности: Отправка заявок в отдел страхования.

![](https://github.com/babidjon666/universityProject/blob/main/Cache/sd_insurance_direct_requests.jpg)

Администратор назначает сотрудников на заявки.

_______________________________________________________________________

Диаграмма последовательности: Просмотреть заявки.

![](https://github.com/babidjon666/universityProject/blob/main/Cache/sd_insurance_watch_requests.jpg)

Сотрудник страховой компании открывает, просматривает список заявок.

_______________________________________________________________________

Диаграмма последовательности: Выдача полисов страхования.

![](https://github.com/babidjon666/universityProject/blob/main/Cache/sd_insurance_give_policy.jpg)

Сотрудник страховой компании создает полис.

_______________________________________________________________________

Диаграмма последовательности: Получение полиса.

![](https://github.com/babidjon666/universityProject/blob/main/Cache/sd_insurance_take_policy.jpg)

Иностранный гражданин в ЛК получает электронную копию полиса.