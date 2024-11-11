CREATE DATABASE testdb123;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    user_id uuid DEFAULT uuid_generate_v4(),
    user_name VARCHAR(40) NOT NULL,
    user_surname VARCHAR(50) NOT NULL,
    user_email VARCHAR(40) NOT NULL UNIQUE,
    user_password VARCHAR(100) NOT NULL,
    user_role VARCHAR NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (user_id)
);


CREATE TABLE books(
    book_id SERIAL,
    book_title VARCHAR(255) NOT NULL UNIQUE,
    book_author_firstname VARCHAR(40) NOT NULL,
    book_author_lastname VARCHAR(40) NOT NULL,
    book_phouse VARCHAR(255) NOT NULL,
    book_category VARCHAR(30) NOT NULL,
    book_edition_number INTEGER NOT NULL,
    book_lang_of_publication VARCHAR(50) NOT NULL,
    book_isbn VARCHAR(100) NOT NULL,
    book_description_short VARCHAR(250) NOT NULL,
    book_description_full VARCHAR(1500) NOT NULL,
    book_nm_of_pages INTEGER NOT NULL,
    book_format VARCHAR(255) NOT NULL,
    book_price NUMERIC(5,2) NOT NULL,
    book_imageurl VARCHAR(255) NOT NULL,
    book_pdfurl VARCHAR(255) NOT NULL,
    book_add_date DATE NOT NULL,
    book_views INTEGER NOT NULL,
    PRIMARY KEY (book_id)
);

CREATE TABLE shopping_cart(
    item_id SERIAL,
    user_id uuid,
    book_id INTEGER NOT NULL,
    price NUMERIC(5,2) NOT NULL,
    period_of_time INTEGER NOT NULL,
    PRIMARY KEY (item_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id)
);

CREATE TABLE borrowed_books(
    borrow_id SERIAL,
    user_id uuid,
    book_id INTEGER NOT NULL,
    price NUMERIC(5,2) NOT NULL,
    access_from DATE NOT NULL,
    access_to DATE NOT NULL,
    period_of_time INTEGER NOT NULL,
    access_to_book BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (borrow_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id)
);

CREATE TABLE order_book(
    order_id SERIAL,
    user_id uuid,
    number_of_books INTEGER NOT NULL,
    total_price NUMERIC(5,2) NOT NULL,
    date_of_order DATE NOT NULL,
    if_paid BOOLEAN DEFAULT FALSE
    PRIMARY KEY (order_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE order_content(
    order_content_id SERIAL,
    order_id INTEGER NOT NULL,
    book_id INTEGER NOT NULL,
    single_book_price NUMERIC(5,2) NOT NULL,
    PRIMARY KEY (order_content_id),
    FOREIGN KEY (order_id) REFERENCES order_book(order_id),
	FOREIGN KEY (book_id) REFERENCES books(book_id)
);

CREATE TABLE payments(
    payment_id SERIAL,
    order_id INTEGER NOT NULL,
    user_email VARCHAR(40) NOT NULL,
    total_price NUMERIC(5,2) NOT NULL,
    date_of_crreation DATE NOT NULL,
    PRIMARY KEY (payment_id),
    FOREIGN KEY (user_email) REFERENCES users(user_email),
    FOREIGN KEY (order_id) REFERENCES order_book(order_id)
	
);

CREATE TABLE verification_keys(
    vkey_id SERIAL,
    user_email VARCHAR(40) NOT NULL UNIQUE,
    vkey_string VARCHAR(255) NOT NULL UNIQUE,
    vkey_creation_date DATE NOT NULL,
    PRIMARY KEY (vkey_id),
    FOREIGN KEY (user_email) REFERENCES users(user_email)
);




INSERT INTO books (book_title, book_author_firstname,book_author_lastname, book_phouse, book_category, book_edition_number, book_lang_of_publication, book_isbn, book_description_short, book_description_full, book_nm_of_pages, book_format, book_price, book_imageurl, book_pdfurl, book_add_date, book_views) VALUES
('Grafika komputerowa dla mechaników','Piotr', 'Krawiec','Wydawnictwo Politechniki Poznańskiej','Informatyka',6,'polski','978-83-7775-572-3','Skrypt jest przeznaczony dla studentów wydziałów: Inżynierii Lądowej i Transportu, Inżynierii Mechanicznej oraz Inżynierii Materiałowej i Fizyki Technicznej Politechniki Poznańskiej, a tak-że dla wszystkich osób zainteresowanych...',
'Skrypt jest przeznaczony dla studentów wydziałów: Inżynierii Lądowej i Transportu, Inżynierii Mechanicznej oraz Inżynierii Materiałowej i Fizyki Technicznej Politechniki Poznańskiej, a tak-że dla wszystkich osób zainteresowanych tematyką komputerowego zapisu konstrukcji i komputerowego wspomagania projektowania'
,223,'pdf',20.55,'/book_images/240029.jpg', '/books_pdf/bibliawindowsserver2019.pdf','2021-01-10' , 5);

INSERT INTO books (book_title, book_author_firstname,book_author_lastname, book_phouse, book_category, book_edition_number, book_lang_of_publication, book_isbn, book_description_short, book_description_full, book_nm_of_pages, book_format, book_price, book_imageurl, book_pdfurl, book_add_date, book_views) VALUES
('Biblia Windows Server 2019. Podręcznik Administratora','Krzysztof', 'Wołk','Psychoskok','Informatyka',1,'polski','978-83-8119-783-0','Kompleksowy i praktyczny przewodnik dla osób zainteresowanych administracją sieciami komputerowymi pod kontrolą Windows Server 2019. Książka od podstaw poparta praktycznymi przykładami oraz mechanizmami integracji z innymi...' ,
'Kompleksowy i praktyczny przewodnik dla osób zainteresowanych administracją sieciami komputerowymi pod kontrolą Windows Server 2019.
Książka od podstaw poparta praktycznymi przykładami oraz mechanizmami integracji z innymi systemami operacyjnymi jak Mac OS X czy Linux.
Prezentuje nie tylko metody postępowania w graficznym interfejsie użytkownika, ale także wprowadza do zarządzania z poziomu Power Shell. Daje ona solidne uzasadnienia pod rozwój personalny w dziedzinie sieci komputerowych.
Propozycja nie tylko dla początkujących administratorów, lecz także dla tych doświadczonych, pragnących szybko i w przyjazny sposób poznać nowości nowego systemu serwerowego firmy Microsoft. Prezentuje najważniejsze jego funkcje i możliwości.
Poza niezbędną teorią zawiera szczegółowe instrukcje i ćwiczenia, w których nawet najdrobniejszy element, jest przedstawiony na zrzucie ekranowym i objaśniony tak, by każdy, kto pierwszy raz pracuje z Windows Server, poradził sobie z jego konfiguracją i administracją.'
,967,'pdf',45.50,'/book_images/238739.jpg', '/books_pdf/bibliawindowsserver2019.pdf', '2021-01-15' , 10);

INSERT INTO books (book_title, book_author_firstname,book_author_lastname, book_phouse, book_category, book_edition_number, book_lang_of_publication, book_isbn, book_description_short, book_description_full, book_nm_of_pages, book_format, book_price, book_imageurl, book_pdfurl, book_add_date, book_views) VALUES
('Nobliści z ekonomii 1969-2020','Leszek','Jasiński','Wydawnictwo Key Text','Ekonomia',1,'polski','978-83-64928-17-8', 'Analiza dorobku laureatów Nagrody Nobla w dziedzinie nauk ekonomicznych stanowi nie tylko okazję do poznania ich osiągnięć, lecz także umożliwia wzbogacenie własnej wiedzy ekonomicznej. Daje bezpośredni kontakt z rezultatami pracy...',
'Analiza dorobku laureatów Nagrody Nobla w dziedzinie nauk ekonomicznych stanowi nie tylko okazję do poznania ich osiągnięć, lecz także umożliwia wzbogacenie własnej wiedzy ekonomicznej. Daje bezpośredni kontakt z rezultatami pracy naukowej ocenionymi szczególnie wysoko jako propozycje rozwiązań najbardziej istotnych zagadnień gospodarczych. Wyróżnienia Królewskiej Szwedzkiej Akademii Nauk trafiają bowiem do ludzi wybitnych. Wielu z nich uzyskało wyniki będące kamieniami milowymi w rozwoju tej dyscypliny naukowej. Publikacja składa się z czterech części. Rozpoczyna ją przedstawienie genezy i zasad przyznawania Nagrody Nobla w dziedzinie nauk ekonomicznych. W głównej części książki zostały omówione sylwetki, poglądy i najważniejsze publikacje laureatów nagrody (od 1969 do 2018 roku). Na końcu pracy podano, jakie szczegółowe obszary nauk ekonomicznych i ośrodki naukowe zostały wyróżnione i kto może okazać się kolejnym noblistą. Leszek J. Jasiński – ekonomista, pracownik Politechniki Warszawskiej na Wydziale Administracji i Nauk Społecznych, dyrektor Instytutu Nauk Ekonomicznych PAN w latach 2005–2013. Zajmuje się ekonomią międzynarodową, finansami i makroekonomią. Autor książek: • Podstawy funkcjonowania gospodarki światowej, • Myślenie perspektywiczne (Uwarunkowania badania przyszłości typu foresight), • Podstawy makroekonomii, • Podstawy mikroekonomii i finansów, • Bliżej centrum czy na peryferiach? (Polskie kontakty gospodarcze z zagranicą w XX wieku).'
,339,'pdf',50.49,'/book_images/239176.jpg', '/books_pdf/bibliawindowsserver2019.pdf', '2021-01-20' , 70);

INSERT INTO books (book_title, book_author_firstname,book_author_lastname, book_phouse, book_category, book_edition_number, book_lang_of_publication, book_isbn, book_description_short, book_description_full, book_nm_of_pages, book_format, book_price, book_imageurl, book_pdfurl, book_add_date, book_views) VALUES
('Apelacje cywilne. Zagadnienia praktyczne akta i kazusy. Wydanie 7','Marcin', 'Kołakowski','C.H. Beck','Prawo',7,'polski','978-83-8198-833-9', 'Apelacje cywilne skierowane są do praktyków, w tym przede wszystkim aplikantów radcowskich i adwokackich, ale także studentów studiów prawniczych i osób, które chciałyby zgłębić wiedzę w zakresie problematyki związanej z apelacją...',
'Apelacje cywilne skierowane są do praktyków, w tym przede wszystkim aplikantów radcowskich i adwokackich, ale także studentów studiów prawniczych i osób, które chciałyby zgłębić wiedzę w zakresie problematyki związanej z apelacją w procesie cywilnym.'
,603,'pdf',80.69,'/book_images/240089.jpg', '/books_pdf/apelacjecywilne.pdf', '2021-01-02' , 100);

INSERT INTO books (book_title, book_author_firstname,book_author_lastname, book_phouse, book_category, book_edition_number, book_lang_of_publication, book_isbn, book_description_short, book_description_full, book_nm_of_pages, book_format, book_price, book_imageurl, book_pdfurl, book_add_date, book_views) VALUES
('Ochrona konsumenta w postępowaniu mediacyjnym i arbitrażowym','Kamila', 'Alicja Lichoń','C.H. Beck','Prawo',2,'polski','978-83-8198-809-4', 'Monografia wyczerpująco omawia stosowanie metod alternatywnego rozstrzygania sporów konsumenckich. Obszernie opisano zarówno podejmowane przez UE regulacje (m.in. dyrektywę w sprawie ADR w sporach konsumenckich oraz rozporządzenie w sprawie ODR...',
'Monografia wyczerpująco omawia stosowanie metod alternatywnego rozstrzygania sporów konsumenckich.

Obszernie opisano zarówno podejmowane przez UE regulacje (m.in. dyrektywę w sprawie ADR w sporach konsumenckich oraz rozporządzenie w sprawie ODR w sporach konsumenckich), jak i polskie przepisy podjęte w celu implementacji tych unormowań.

Publikacja porusza temat bardzo istotny w praktyce – z uwagi na konieczność zagwarantowania wysokiego poziomu ochrony konsumentów oraz sprawnego funkcjonowania rynku wewnętrznego stosowanie alternatywnych wobec drogi sądowej metod rozstrzygania sporów staje się niezwykle istotne.'
,481,'pdf',150.69,'/book_images/240030.jpg', '/books_pdf/ochronakonsumenta.pdf', '2021-01-04' , 50);

INSERT INTO books (book_title, book_author_firstname,book_author_lastname, book_phouse, book_category, book_edition_number, book_lang_of_publication, book_isbn, book_description_short, book_description_full, book_nm_of_pages, book_format, book_price, book_imageurl, book_pdfurl, book_add_date, book_views) VALUES
('Klasyfikacja Budżetowa 2021','Krystyna', 'Gąsiorek','Infor PL','Prawo',1,'polski','978-83-8137-839-0', 'W związku z licznymi zmianami przepisów oraz wprowadzanymi reformami klasyfikacja budżetowa jest ciągle nowelizowana. Niektóre podziałki przestają obowiązywać, pojawiają się nowe, a przy niektórych zmieniają się objaśnienia. Jednostki...',
'W związku z licznymi zmianami przepisów oraz wprowadzanymi reformami klasyfikacja budżetowa jest ciągle nowelizowana. Niektóre podziałki przestają obowiązywać, pojawiają się nowe, a przy niektórych zmieniają się objaśnienia. Jednostki sektora finansów publicznych powinny na bieżąco uwzględniać te zmiany w planowaniu, rachunkowości i sprawozdawczości.
Najnowsza nowelizacja rozporządzenia o klasyfikacji budżetowej z 27 lipca 2020 r. objęła rozdziały, a także paragrafy dochodowe (m.in. nowy paragraf 088) i wydatkowe (m.in. nowy paragraf 471 dotyczący PPK). Ze względu na dużą liczbę poprawek zdecydowano się na całkowitą zmianę brzmienia załączników nr 2, 3 i 4 do rozporządzenia. Zmiany te, z pewnymi wyjątkami, weszły już w życie z mocą wsteczną od 1 stycznia 2020 r. Część zmian po raz pierwszy trzeba będzie zastosować do opracowania projektu ustawy budżetowej oraz projektów uchwał budżetowych na rok 2021. Publikacja stanowi ujednoliconą wersję klasyfikacji budżetowej. Obejmuje wszystkie zmiany wprowadzone w rozporządzeniu Ministra Finansów z 2 marca 2010 r. w sprawie szczegółowej klasyfikacji dochodów, wydatków, przychodów i rozchodów oraz środków pochodzących ze źródeł zagranicznych.'
,490,'pdf',65.49,'/book_images/239824.jpg', '/books_pdf/klasyfikacjabudetowa.pdf', '2021-01-20' , 20);



