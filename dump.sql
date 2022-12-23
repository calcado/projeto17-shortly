--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (9, 2, 'https://www.google.com/', 'LovFqe-0kE', 0, '2022-12-23 15:00:47.711577');
INSERT INTO public.urls VALUES (10, 2, 'https://www.google.com/', 'Y4_1JflXsQ', 0, '2022-12-23 15:00:51.722546');
INSERT INTO public.urls VALUES (11, 2, 'https://www.google.com/', 'Ksfa3vNbLF', 0, '2022-12-23 15:00:52.64539');
INSERT INTO public.urls VALUES (12, 2, 'https://www.google.com/', 'WtZlcDgPTe', 0, '2022-12-23 15:00:53.541226');
INSERT INTO public.urls VALUES (13, 2, 'https://www.google.com/', 'nWsK1jwlyY', 6, '2022-12-23 15:00:54.173803');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'batata', 'batata@batata.com', '$2b$10$DGnRV7ih3mSFJ30u5I7MVeUA5BGY7s1zBG/g0X.BTY0grTCyhciwm', '2022-12-22 14:14:52.715252');
INSERT INTO public.users VALUES (2, 'banana', 'banana@banana.com', '$2b$10$3k7/R6XiRS04SNNn8136du4FmobjfAxC7..mqEC2Jcc1FOwy6DPPO', '2022-12-22 14:36:01.030057');
INSERT INTO public.users VALUES (5, 'maca', 'maca@maca.com', '$2b$10$eQAQ6uezR3/E7QcD4IkNmOTft0fhEkBHsLgBFQ02h.g1O3mkjg0xu', '2022-12-22 14:37:41.576442');
INSERT INTO public.users VALUES (8, 'alface', 'alface@alface.com', '$2b$10$.PS6HXYyWQlgmoQskKm/Metdw2SN9LqfFf0/RByNBeuaMDqx8ST0O', '2022-12-22 14:39:01.116667');
INSERT INTO public.users VALUES (16, 'alface', '', '$2b$10$bAEC5Y9rlvWTXrwG47FTVudI9k1Ek6GKGPFJwJic5CLVJje.fmAEO', '2022-12-22 15:48:24.171134');
INSERT INTO public.users VALUES (20, 'manga', 'manga@manga', '$2b$10$ERuOOXMvQv1Ihgt9sGhGbO2CPt6d4An2ffRfHtL1.8TywhED.CAOC', '2022-12-22 16:13:10.535302');
INSERT INTO public.users VALUES (21, 'laranja', 'laranja@laranja', '$2b$10$m0uliQeA7MCdh2a51xBe5.mh9e7UVfMhSbE.YIMlE4yQwWF/ar3uy', '2022-12-23 10:51:18.005296');


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 13, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 21, true);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

