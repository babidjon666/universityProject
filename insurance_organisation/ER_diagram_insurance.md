![](https://github.com/babidjon666/universityProject/blob/main/Cache/ERD_insurance.jpg)

Сущности 
<ul>
  <li>Иностранный гражданин</li>
  <li>База клиентов (приложение)</li>
  <li>Администратор системы</li>
  <li>Заявка на полис</li>
  <li>Работник страховой компании</li>
  <li>Полис ОМС</li>
  <li>Полис ДМС</li>
</ul>

Отношения (действия)
<ul>
  <li>Иностранный гражданин - регистрируется(авторизуется) в приложении - База клиентов (1 к M). Один иностранный гражданин может зарегистрироваться(авторизоваться) только по своим учетным данным</li>
  <li>Иностранный гражданин - Создает заявку на полис - Заявка на полис (1 к 1). Иностранный гражданин единовременно может создать только одну заявку на полис</li>
  <li>Администратор системы - проверяет заявки - Заявка на полис (1 к М). Один администратор может проверять множество заявок на полисы</li>
  <li>Работник страховой компании - обрабатывает, заключает договор - Заявка на полис(1 к М)</li>
  <li>Работник страховой компании - выдает - полис ОМС (1 к М). Работник может выдавать множество полисов ОМС</li>
  <li>Работник страховой компании - выдает - полис ДМС (1 к М). Работник может выдавать множество полисов ДМС</li>
  <li>Иностранный гражданин - получает - Полис ОМС (1 к 1). Один гражданин может иметь только один полис ОМС</li>
  <li>Иностранный гражданин - получает - Полис ДМС (1 к М). Один гражданин может иметь несколько полисов ДМС (напр.: один оформил сам, чтобы в поездке за границу в случае ЧП ему не пришлось брать кредит, а второй ему оформил работодатель, потому что работодатель крутой)</li>
</ul>