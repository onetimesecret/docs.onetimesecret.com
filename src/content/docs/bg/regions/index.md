---
title: Data Center Regions
description: Научете повече за регионите на центровете за данни на Onetime Secret и как да изберете подходящия за вашите нужди.
---

Onetime Secret предлага четири региона на центрове за данни: Европейския съюз (ЕС), Съединените щати (САЩ), Канада (CA) и Нова Зеландия (NZ). Това ръководство ще ви помогне да разберете значението на избора на регион и как да изберете правилния за вашите нужди.

## Защо е важен изборът на регион

Изборът на правилния регион на центъра за данни е от решаващо значение по няколко причини:

1. **Суверенитет на данните**: Различните региони имат различни закони и разпоредби за защита на данните.
2. **Латентност**: Изборът на регион, който е по-близо до основната база от потребители, може да намали латентността.
3. **Съответствие**: Някои организации имат специфични изисквания за това къде могат да се съхраняват техните данни.

## Налични региони

### Европейски съюз (ЕС)

- **Мястоположение**: Европейският съюз (Нюрнберг)
- **URL**: [https://eu.onetimesecret.com](https://eu.onetimesecret.com)
- **Ключови характеристики**:
  - Съответствие с GDPR и други разпоредби на ЕС за защита на данните
  - Идеален за европейски потребители или такива, които обслужват предимно европейски клиенти

### Канада (CA)

- **Мястоположение**: Канада (Торонто)
- **URL**: [https://ca.onetimesecret.com](https://ca.onetimesecret.com)
- **Ключови характеристики**:
  - Съответствие с PIPEDA и канадските закони за защита на данните
  - Подходящ за канадски потребители или такива, които обслужват предимно канадски клиенти

### Aotearoa Нова Зеландия (NZ)

- **Мястоположение**: Нова Зеландия (Порируа)
- **URL**: [https://nz.onetimesecret.com](https://nz.onetimesecret.com)
- **Ключови характеристики**:
  - Съответствие със Закона за защита на личните данни на Нова Зеландия и местните разпоредби
  - Подходящ за потребители от Нова Зеландия или за тези, които обслужват клиенти от Океания

### Съединени щати (САЩ)

- **Мястоположение**: Съединените щати (Хилсбъро, Орегон)
- **URL**: [https://us.onetimesecret.com](https://us.onetimesecret.com)
- **Ключови характеристики**:
  - Съответствие със законите на САЩ за защита на данните
  - Подходящ за потребители, базирани в САЩ, или за такива, които обслужват предимно клиенти от САЩ

## Архитектура без споделяне

Onetime Secret използва архитектура "споделяне-нещо", която осигурява пълна изолация на данните между регионите:

- **Отделни сметки**: Създаването на акаунт в който и да е регионален домейн е напълно отделно от акаунтите в други домейни, дори ако използвате един и същ имейл адрес.
- **Не се извършват операции в различни центрове**: Не можете да извършвате операции (като изгаряне на тайна) в различни центрове за данни. Всеки център поддържа свой собствен набор от тайни и потребителски данни.
- **Последователно фактуриране за платени потребители**: За платените акаунти, въпреки че не се споделят потребителски данни между центровете, абонаментният ви статус се разпознава в различните региони чрез нашия доставчик на плащания, Stripe.

## Как да изберем своя регион

При избора на регион на център за данни вземете предвид следните фактори:

### За анонимни потребители

- Заявките към onetimesecret.com могат да бъдат пренасочвани към всеки активен център за данни.
- Местонахождението на вашата тайна винаги е ясно от генерираната връзка (напр. `us.onetimesecret.com/secret/abcd1234`).
- Можете да изберете конкретно местоположение на данните, като преминете директно към някой регионален домейн (напр. [ca.onetimesecret.com](https://ca.onetimesecret.com/)).

### За автентифицирани потребители

- При създаването на нов акаунт трябва да изберете местоположение на център за данни.
- Ще трябва да се върнете в същото местоположение, за да влезете в него.
- Съществуващите акаунти и тайни остават в първоначалния си център за данни.

### За всички потребители

- Тайните, създадени без юрисдикция на поддомейн (напр. onetimesecret.com/secret/efgh5678), ще продължат да се използват по подразбиране в нашия център за данни в ЕС.
- Всички потребители, както платени, така и безплатни, могат да изберат предпочитания от тях център за данни при създаването на акаунт.

### Допълнителни съображения

1. **За физически лица**:
   - Лични предпочитания
   - Близост до вашето местоположение за потенциално по-бърз достъп
   - Загриженост за суверенитета на личните данни

2. **За фирми**:
   - Правни и регулаторни изисквания
   - Местоположение на основната база клиенти
   - Специфични за отрасъла нужди от съответствие

3. **Технически съображения**:
   - Изисквания за латентност за вашето приложение
   - Интеграция с други услуги или системи

## Цени и планове

Ангажиментът ни за локализиране на данните се разпростира и върху модела ни на ценообразуване:

- Таксите се определят въз основа на това откъде плащате, а не къде е създаден профилът ви.
- Плановете Identity Plus включват неограничен брой потребителски домейни във всички центрове за данни в рамките на един абонамент.

## Бъдещи планове

Непрекъснато работим за разширяване на възможностите на нашите центрове за данни. Бъдещите ни планове включват допълнителни центрове за данни в:

- Бразилия
- Испания
- ВЕЛИКОБРИТАНИЯ

Тези разширения ще осигурят още повече възможности за локализиране на данните, като подобрят производителността и възможностите за съответствие за потребителите в различни региони.

## Създаване на вашия регион

При настройването на акаунт Onetime Secret или конфигурирането на персонализиран домейн ще имате възможност да изберете предпочитания от вас регион. Ето как:

1. За нови акаунти: Изберете предпочитания от вас регион по време на процеса на регистрация.
2. За съществуващи акаунти: Свържете се с нашия екип за поддръжка, за да обсъдите възможностите за миграция на региона.
3. За персонализирани домейни: Посочете избрания регион при конфигурирането на DNS настройките (за подробни инструкции вижте нашето [Ръководство за настройка на потребителски домейни](/docs/custom-domains/setup-guide)).

## Често задавани въпроси

**В: Мога ли да променя своя регион след създаването на акаунта си?**
О: Да, можете да промените региона си, като създадете нов акаунт със същия имейл адрес и преминете към екрана на акаунта. Ако имате активен абонамент, профилът ви ще се актуализира автоматично (може да се наложи да опресните страницата).

Моля, обърнете внимание:
- Съществуващите данни не се прехвърлят между регионите.
- Всички тайни връзки, които сте създали, ще продължат да функционират, докато не бъдат прегледани или докато не изтече срокът им на валидност
- За връзки с потребителски домейни ще трябва да:
  1. да добавите отново домейна към профила си в новия регион
  2. Да актуализирате свързаните DNS записи
  3. Използвайте уникален поддомейн при повторното добавяне на домейна, за да избегнете конфликти със съществуващи връзки
  4. По-късно можете да добавите предпочитания от вас домейн (ако е необходимо), за да можете да започнете да изпращате нови връзки с предпочитания от вас домейн

**В: Влияе ли изборът ми на регион върху сигурността на моите тайни?**
О: Не, всички региони предлагат еднакво високо ниво на сигурност. Изборът влияе най-вече върху престоя на данните и потенциалната латентност.

**В: Има ли разлики в цените между регионите?**
О: Понастоящем цените ни са еднакви за всички региони. Проверете нашата [страница за ценообразуване](https://onetimesecret.com/pricing) за най-актуална информация.

## Имате нужда от помощ?

Ако не сте сигурни кой регион да изберете или имате някакви въпроси, не се колебайте да се свържете с нашия екип за поддръжка. Ние сме тук, за да ви помогнем да вземете най-доброто решение за вашите специфични нужди.

- Имейл: support@onetimesecret.com
- Формуляр за обратна връзка: [https://onetimesecret.com/feedback](https://onetimesecret.com/feedback)

Не забравяйте, че изборът на правилния регион гарантира най-добрата ви производителност и спазване на всички съответни разпоредби за данните при използването на Onetime Secret.
