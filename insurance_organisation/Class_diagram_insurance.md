<h1>Многослойная архитектура WEB API</h1>

1) Controllers - слой API.
2) Services - слой бизнес логики.
3) Repositories - слой доступа к данным.
4) Models - слой данных.

<h1>Enums:</h1>

1) RoleName - перечесление ролей пользователя, нужен для распределения ролей.
2) Nationality - перечисление национальностей, нужен для определения национальности в паспорте иностранного гражданина.
3) RequestStatus - перечесление статусов заявки, нужен для определения статуса заявки на полис ОМС/ДМС.
4) RequestType - перечесление типов заявки, нужено для определения типа полиса (ОМС/ДМС).

<h1>Вспомогательные классы:</h1>

1) HashPassword - статичный класс, используемый для кеширования пароля.
2) JwtSettings - класс-настройка для JWT токена.
3) ApplicationDbContext - класс для Entity Freimwork, используемые для настройки связей между таблицами базы данных.
   
<h1>Models:</h1>

1) UserModel - модель пользователя, который еще не имеет роли, нужен для хранения ФИО, логина и пароля
2) BaseRoleModel - базовый класс роли.
3) AdminRoleModel - дочерний класс от класса BaseRoleModel. Имеет свои права в контроллерах.
4) EmployeeRoleModel - дочерний класс от класса BaseRoleModel. Имеет свои права в контроллерах.
5) ClientRoleModel - дочерний класс от класса BaseRoleModel. Хранит в себе атрибуты Пользователя. Имеет свои права в контроллерах.
6) TemporaryResidencePermit - разрешение на временное проживание, класс используемый в роли атрибута в классе ClientRoleModel.
7) ResidentCard - вид на жительство, класс используемый в роли атрибута в классе ClientRoleModel.
8) EmploymentContract - трудовой договор, класс используемый в роли атрибута в классе ClientRoleModel.
9) Passport - паспорт, класс используемый в роли атрибута в классе ClientRoleModel.
10) Request - заявка на полис, которую создает иностранный гражданин.
11) Policy - полис ОМС/ДМС.
12) InsuranceInfo - информация о страховки, класс используеммый в качестве атрибута в классе Policy.

<h1>Controllers:</h1>

1) PersonalInfoController - класс-контроллер, включает в себя запросы со стороны клиента на редактирование и заполнения персональных данных Иностранного гражданина (паспорт, вид на жительство, трудовой договор и тд.)
2) PolicyController - класс-контроллер, включает в себя запросы со стороны клиента на выдачу полисов ОМС/ДМС.
3) RequestController - класс-контроллер, включает в себя запросы со стороны клиента на обработку заявок (просмотр, редактирование, создание, обработка)
4) AuthController - класс-контроллер, отвечающий за регистрацию и авторизацию пользователей.

<h1>Services:</h1>

1) PersonalInfoService - класс-сервис, который содержит бизнес логику персональных данных.
2) PolicyService - класс-сервис, который содержит бизнес логику полисов ОМС/ДМС.
3) RequestService - класс-сервис, который содержит бизнес логику заявок.
4) AuthService - класс-сервис, который содержит бизнес логику авторизации.

<h1>Repositories:</h1>

1) BaseRepository - базовый класс-репозиторий, который обращается к базе данных.
2) PersonalInfoRepository - дочерний класс-репозиторий, содержит методы для работы с персональной информацией в базе данных.
3) PolicyRepository - дочерний класс-репозиторий, содержит методы для работы с полисом в базе данных.
4) RequestRepository - дочерний класс-репозиторий, содержит методы для работы с заявками на полис ОМС/ДМС.
5) AuthRepository - дочерний класс-репозиторий, содержит методы для работы с авторизацией и регистрацией пользователя.

<h1>Interfaces:</h1>

1) IPersonalInfoService - интерфейс для реализации Dependency Injection.
2) IPolicyService - интерфейс для реализации Dependency Injection.
3) IRequestService - интерфейс для реализации Dependency Injection.
4) IAuthService - интерфейс для реализации Dependency Injection.
5) IPersonalInfoRepository - интерфейс для реализации Dependency Injection.
6) IPolicyRepository - интерфейс для реализации Dependency Injection.
7) IRequestRepository - интерфейс для реализации Dependency Injection.
8) IAuthRepository - интерфейс для реализации Dependency Injection.

ссылка на StarUml диаграмму - https://github.com/babidjon666/universityProject/blob/main/Cache/UML_insurance.mdj
![](https://github.com/babidjon666/universityProject/blob/main/Cache/insurance_class.png)
