import React, { useState, useEffect, useRef } from "react";
import {
  Recycle,
  Smartphone,
  CreditCard,
  Menu,
  X,
  Instagram,
  Youtube,
  Globe,
  TrendingUp,
  Zap,
  ArrowRight,
  Calculator,
  Smile,
  Cpu,
  Wifi,
  Database,
  MapPin,
  ChevronDown,
  ChevronUp,
  Users,
  Award,
  ExternalLink,
  ShieldCheck,
  Leaf,
  Trees,
  Wind,
  Star,
  Mail,
  Check,
  CheckCircle,
  ArrowLeft,
  Briefcase,
  FileText,
  PieChart,
  User
} from "lucide-react";

// 1. БАЗА ДАННЫХ КОНТЕНТА (DATA LAYER)

const PARTNERS_DATA = [
  { 
    id: 1, 
    name: "GEF (Global Environment Facility)", 
    role: "Грантодатель",
    desc: "Финансирование эко-инноваций в рамках Программы малых грантов.",
    category: "finance", 
    icon: <Globe size={28} />, 
    link: "https://www.thegef.org/",
    color: "text-blue-400", 
    bg: "bg-blue-500/10",
    border: "hover:border-blue-500",
    gradient: "from-blue-500/20 to-transparent"
  },
  { 
    id: 2, 
    name: "Kaspi.kz", 
    role: "FinTech Партнер",
    desc: "Эксклюзивная интеграция API для мгновенных выплат на Kaspi Gold и QR.",
    category: "tech", 
    icon: <CreditCard size={28} />, 
    link: "https://kaspi.kz/",
    color: "text-red-500", 
    bg: "bg-red-500/10",
    border: "hover:border-red-500",
    gradient: "from-red-500/20 to-transparent"
  },
  { 
    id: 3, 
    name: "KazRecycle Industry", 
    role: "Переработка",
    desc: "Завод полного цикла. Гарантирует, что 100% собранного пластика получит вторую жизнь.",
    category: "ecology", 
    icon: <Recycle size={28} />, 
    link: "#",
    color: "text-emerald-400", 
    bg: "bg-emerald-500/10",
    border: "hover:border-emerald-500",
    gradient: "from-emerald-500/20 to-transparent"
  },
  { 
    id: 4, 
    name: "Google for Startups", 
    role: "Cloud & AI",
    desc: "Предоставление мощностей Cloud Vision API для распознавания брендов мусора.",
    category: "tech", 
    icon: <Cpu size={28} />, 
    link: "https://www.campus.co/",
    color: "text-yellow-400", 
    bg: "bg-yellow-500/10",
    border: "hover:border-yellow-500",
    gradient: "from-yellow-500/20 to-transparent"
  },
  { 
    id: 5, 
    name: "Magnum Cash & Carry", 
    role: "Ритейл-сеть",
    desc: "Стратегическое размещение фандоматов во входных группах супермаркетов.",
    category: "retail", 
    icon: <MapPin size={28} />, 
    link: "https://magnum.kz/",
    color: "text-orange-400", 
    bg: "bg-orange-500/10",
    border: "hover:border-orange-500",
    gradient: "from-orange-500/20 to-transparent"
  },
  { 
    id: 6, 
    name: "Astana Hub", 
    role: "Экосистема",
    desc: "Налоговые преференции, офисное пространство и доступ к венчурному капиталу.",
    category: "tech", 
    icon: <Wifi size={28} />, 
    link: "https://astanahub.com/",
    color: "text-purple-400", 
    bg: "bg-purple-500/10",
    border: "hover:border-purple-500",
    gradient: "from-purple-500/20 to-transparent"
  },
];

const FAQ_DATA = [
    { q: "Как происходит выплата денег?", a: "Всё просто: скачайте приложение, привяжите номер телефона. После сдачи тары отсканируйте QR-код на экране фандомата. Деньги поступят на внутренний баланс мгновенно. Вывод на Kaspi доступен от 500 тенге без комиссии." },
    { q: "Какие типы отходов принимаются?", a: "Мы принимаем ПЭТ-бутылки (маркировка 1), алюминиевые банки (из-под напитков). В расширенных пунктах принимается стекло и макулатура. Бутылки из-под масла и бытовой химии пока не принимаются." },
    { q: "Нужно ли снимать крышки и этикетки?", a: "Нет, умный пресс внутри фандомата разделяет крышки и бутылки. Этикетки также удаляются на этапе переработки. Главное – чтобы бутылка была пустой." },
    { q: "Где посмотреть карту фандоматов?", a: "Полная интерактивная карта с статусами заполненности доступна в нашем мобильном приложении EcoReward." },
];

const REVIEWS = [
    { name: "Захар Н.", role: "Студент Политех", text: "Сдаю бутылки из общаги. За месяц накопил на подписку Spotify и еще осталось на перекус. Реально работает!", stars: 5 },
    { name: "Артур П.", role: "Эко-активист", text: "Наконец-то цивилизованный сбор мусора в Алматы. Фандоматы чистые, приложение не тупит. Радует, что пластик реально идет на переработку.", stars: 5 },
    { name: "Даниил К.", role: "Предприниматель", text: "Поставили такой аппарат у нас в бизнес-центре. Сотрудники в восторге, соревнуются, кто больше сдаст.", stars: 4 },
    { name: "Аружан Т.", role: "Фрилансер", text: "Сдаю пластик каждую неделю в Достык Плазе. Очень нравится, что деньги падают сразу на Каспи без всяких сложных выводов.", stars: 5 },
    { name: "Денис М.", role: "Школьник", text: "Начал собирать банки ради интереса, теперь весь класс копит. Крутая система уровней, пытаюсь добить 'Эко-Лидера'!", stars: 5 },
    { name: "Динара А.", role: "Домохозяйка", text: "Наконец-то дома порядок. Сортируем мусор всей семьей, а на бонусы из приложения оплачиваем коммуналку за интернет.", stars: 5 },
    { name: "Тимур Б.", role: "IT-специалист", text: "Интерфейс приложухи просто пушка. Автомат распознает бутылки без задержек с помощью камеры. Респект разработчикам за AI.", stars: 5 },
    { name: "Айгерим Т.", role: "Мама в декрете", text: "Сдаем пластик вместе с детьми во время прогулки возле Магнума. Отличный пример для малышей, плюс капают денежки на Каспи!", stars: 5 },
    { name: "Тимур И.", role: "Студент", text: "Фандомат в универе – это топ. Пьешь колу, кидаешь банку, получаешь кеш. Жаль только, что иногда аппарат быстро переполняется.", stars: 4 },
    { name: "Гульмира А.", role: "Пенсионер", text: "Очень хорошая прибавка к пенсии. Внук показал как пользоваться приложением, теперь сама сканирую штрихкоды. У меня уже бонус +15%.", stars: 5 },
    { name: "Асель М.", role: "Фитнес-тренер", text: "Пью много воды на тренировках, бутылок скапливалась гора. Теперь все уходит в EcoReward. И экологично, и выгодно!", stars: 5 },
    { name: "Руслан Б.", role: "Школьник", text: "Копим с классом на экскурсию. У нас уже статус Эко-Актив, получаем больше бонусов за каждый килограмм макулатуры!", stars: 5 },
];

const FOOTER_LINKS = [
    { label: 'О нас', id: 'about' },
    { label: 'Команда', id: 'team' },
    { label: 'Карьера', id: 'career' },
    { label: 'Инвесторам', id: 'investors' }
];

// 2. ГЛАВНЫЙ КОМПОНЕНТ

const EcoReward = () => {
  const [currentPage, setCurrentPage] = useState("home"); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [partnerFilter, setPartnerFilter] = useState("all");
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);
  const [isReviewFading, setIsReviewFading] = useState(false);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
        setScrolled(window.scrollY > 50);
        setOffsetY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (currentPage !== "home") return;
    const timer = setInterval(() => {
      changeReview((currentReview + 1) % REVIEWS.length);
    }, 6000); 
    return () => clearInterval(timer);
  }, [currentReview, currentPage]);

  const changeReview = (index) => {
      setIsReviewFading(true);
      setTimeout(() => {
          setCurrentReview(index);
          setIsReviewFading(false);
      }, 300);
  };

  const navigateTo = (pageId) => {
      setCurrentPage(pageId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsMenuOpen(false);
  };

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    if (currentPage !== "home") {
        setCurrentPage("home");
        setTimeout(() => {
            const element = document.getElementById(id.replace('#', ''));
            if (element) {
                const headerOffset = 100;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        }, 150);
        return;
    }
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const filteredPartners = partnerFilter === "all" 
    ? PARTNERS_DATA 
    : PARTNERS_DATA.filter(p => p.category === partnerFilter);

  const handleSubscribe = (e) => {
      e.preventDefault();
      if(email) {
          setSubscribed(true);
          setTimeout(() => setSubscribed(false), 3000);
          setEmail("");
      }
  };

  return (
    <div 
        onContextMenu={(e) => e.preventDefault()} 
        className="select-none min-h-screen bg-slate-950 text-white font-sans overflow-x-hidden flex flex-col"
    >
      
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20"></div>
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              <div style={{ transform: `translateY(${offsetY * 0.5}px)` }} className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px]"></div>
              <div style={{ transform: `translateY(${offsetY * 0.2}px)` }} className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]"></div>
              <div style={{ transform: `translateY(${offsetY * 0.8}px)` }} className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[120px]"></div>
          </div>
      </div>

      <div className="bg-emerald-950/80 border-b border-emerald-500/20 py-2 overflow-hidden whitespace-nowrap relative z-50 backdrop-blur-md">
        <div className="animate-marquee inline-flex items-center gap-4 md:gap-8 text-[10px] md:text-sm font-mono text-emerald-400 font-bold tracking-wider">
          <TickerItem label="LIVE" text="Собрано сегодня: 1,240 кг" />
          <TickerItem label="PAYOUT" text="Выплачено: 854,000 ₸" />
          <TickerItem label="NEW" text="Точка в ТРЦ Mega Park открыта" />
          <TickerItem label="CO2" text="Предотвращено выбросов: 450 кг" />
          <TickerItem label="PROMO" text="+10% бонусов для студентов" />
          <TickerItem label="LIVE" text="Собрано сегодня: 1,240 кг" />
          <TickerItem label="PAYOUT" text="Выплачено: 854,000 ₸" />
          <TickerItem label="NEW" text="Точка в ТРЦ Mega Park открыта" />
        </div>
      </div>


      <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? "top-0 bg-slate-950/95 backdrop-blur-xl border-b border-emerald-500/20 py-3 shadow-lg shadow-emerald-900/10" : "top-8 bg-transparent py-4 md:py-6"}`}>
        <div className="container mx-auto px-4 md:px-6 2xl:px-12 max-w-7xl 2xl:max-w-[1600px] flex justify-between items-center">
          <div className="text-xl md:text-2xl 2xl:text-3xl font-black tracking-tighter flex items-center gap-2 cursor-pointer group" onClick={() => navigateTo('home')}>
            <div className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-emerald-500 blur-lg opacity-40 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow"></div>
                <Recycle className="relative z-10 text-emerald-400 group-hover:rotate-180 transition-transform duration-700 w-full h-full" />
            </div>
            <span>ECO<span className="text-emerald-400">REWARD</span></span>
          </div>

          <div className="hidden lg:flex space-x-6 2xl:space-x-12 items-center">
            {["Технологии", "App", "Партнеры", "FAQ"].map((name, i) => (
              <button key={i} onClick={() => scrollToSection(`#${name === 'App' ? 'app-preview' : name === 'Технологии' ? 'tech' : name === 'Партнеры' ? 'partners' : 'faq'}`)} className="text-sm 2xl:text-base font-bold uppercase tracking-widest text-slate-300 hover:text-emerald-400 transition-colors relative group py-2">
                {name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            <button 
                onClick={() => setIsCalcOpen(true)} 
                className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2.5 2xl:px-8 2xl:py-3 2xl:text-lg rounded-xl font-bold hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:-translate-y-0.5 transition-all active:scale-95 flex items-center gap-2 border border-emerald-400/30 group"
            >
              <Calculator size={20} className="group-hover:animate-bounce" /> 
              <span>Калькулятор</span>
            </button>
          </div>

          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white hover:text-emerald-400 p-2 transition-colors">
              {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>

         <div className={`lg:hidden fixed top-[60px] md:top-[70px] left-0 w-full bg-slate-900/95 backdrop-blur-xl border-b border-emerald-500/20 transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-[500px] py-8' : 'max-h-0 py-0'}`}>
            <div className="flex flex-col items-center space-y-6">
                {["Технологии", "Партнеры", "FAQ"].map((name, i) => (
                <button key={i} onClick={() => scrollToSection(`#${name === 'Технологии' ? 'tech' : name === 'Партнеры' ? 'partners' : 'faq'}`)} className="text-xl font-bold uppercase tracking-widest hover:text-emerald-400">
                    {name}
                </button>
                ))}
                <button onClick={() => { setIsCalcOpen(true); setIsMenuOpen(false); }} className="w-11/12 md:w-3/4 bg-emerald-600 py-4 font-bold uppercase rounded-xl shadow-lg flex justify-center items-center gap-2 text-lg">
                    <Calculator size={24}/> Рассчитать доход
                </button>
            </div>
         </div>
      </nav>

      <main className="flex-grow">
      {currentPage === "home" ? (
          <>

            <header className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden px-4">
                <div className="container mx-auto px-4 md:px-6 2xl:px-12 max-w-7xl 2xl:max-w-[1600px] relative z-10">
                    <div className="flex flex-col items-center text-center">
                        <div className="inline-flex items-center gap-2 mb-6 md:mb-8 px-4 md:px-5 py-2 border border-emerald-500/30 rounded-full bg-emerald-950/40 backdrop-blur-md shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:bg-emerald-900/50 transition-colors cursor-default animate-fade-in-up">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span className="text-emerald-300 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">Smart City Initiative 2026</span>
                        </div>
                        
                        <h1 className="text-5xl sm:text-6xl md:text-8xl 2xl:text-[9rem] font-black mb-6 md:mb-8 leading-none tracking-tighter uppercase drop-shadow-2xl animate-fade-in-up delay-100">
                            Мусор <span className="text-slate-600 mx-1 md:mx-2 inline-block animate-pulse">→</span> 
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-emerald-500 animate-gradient-x block sm:inline"> Деньги</span>
                        </h1>
                        
                        <p className="text-slate-400 text-base sm:text-lg md:text-2xl 2xl:text-3xl max-w-xl md:max-w-3xl 2xl:max-w-5xl mx-auto mb-10 md:mb-12 leading-relaxed font-light animate-fade-in-up delay-200 px-2">
                            <strong className="text-white font-bold">EcoReward</strong> – это экосистема, превращающая осознанность в доход. 
                            Сдавайте вторсырье и получайте выплаты на <span className="text-white border-b-2 border-green-500 whitespace-nowrap">Kaspi QR</span>.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center w-full sm:w-auto animate-fade-in-up delay-300">
                            <button onClick={() => setIsCalcOpen(true)} className="group relative w-full sm:w-auto px-6 md:px-8 py-4 md:py-5 2xl:py-6 2xl:px-10 2xl:text-xl bg-white text-black font-black uppercase tracking-wider rounded-xl overflow-hidden transition-transform hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                                <span className="relative z-10 flex items-center justify-center gap-2">Начать зарабатывать <ArrowRight className="group-hover:translate-x-2 transition-transform"/></span>
                                <div className="absolute inset-0 bg-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 z-0"></div>
                            </button>
                            <button className="group w-full sm:w-auto px-6 md:px-8 py-4 md:py-5 2xl:py-6 2xl:px-10 2xl:text-xl border border-white/20 hover:border-emerald-400 hover:bg-emerald-900/20 text-white font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-3 backdrop-blur-sm">
                                <Smartphone size={24} className="group-hover:text-emerald-400 transition-colors group-hover:rotate-12" /> 
                                <span>Скачать App</span>
                            </button>
                        </div>
                    </div>
                </div>

                <FloatingIcon icon={<Recycle size={50} />} top="15%" left="5%" delay="0s" duration="6s" />
                <FloatingIcon icon={<Leaf size={40} />} top="25%" right="10%" delay="2s" duration="7s" />
                <FloatingIcon icon={<CreditCard size={45} />} bottom="15%" left="15%" delay="1s" duration="8s" />
                <FloatingIcon icon={<Zap size={35} />} bottom="20%" right="20%" delay="3s" duration="5s" />
            </header>

            <section className="py-12 md:py-16 border-y border-white/5 bg-slate-900/50 backdrop-blur-sm relative z-20">
                <div className="container mx-auto px-4 md:px-6 2xl:px-12 max-w-7xl 2xl:max-w-[1600px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    <AnimatedStat icon={<Cpu />} target={50} suffix="+" label="Умных фандоматов" color="text-blue-400" />
                    <AnimatedStat icon={<Users />} target={12500} suffix="" label="Активных юзеров" color="text-purple-400" />
                    <AnimatedStat icon={<Recycle />} target={145} suffix="Т" label="Тонн переработано" color="text-emerald-400" />
                    <AnimatedStat icon={<CreditCard />} target={15} suffix="М" label="Выплачено (₸)" color="text-red-400" />
                </div>
            </section>

            <section id="tech" className="py-16 md:py-24 relative z-10">
                <div className="container mx-auto px-4 md:px-6 2xl:px-12 max-w-7xl 2xl:max-w-[1600px]">
                <SectionHeader title="Технологии Будущего" subtitle="Инновации на страже чистоты" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 2xl:gap-12">
                    <TechCard 
                        title="AI Computer Vision" 
                        desc="Встроенная камера и нейросеть определяют тип материала, бренд и степень загрязнения за 0.2 секунды. Обмануть систему невозможно."
                        icon={<Zap size={32} />}
                        color="text-yellow-400"
                        bg="from-yellow-500/20 to-transparent"
                    />
                    <TechCard 
                        title="IoT & Big Data" 
                        desc="Каждый аппарат – это IoT-устройство. Мы в реальном времени видим заполненность и строим оптимальные маршруты для вывоза."
                        icon={<Wifi size={32} />}
                        color="text-blue-400"
                        bg="from-blue-500/20 to-transparent"
                    />
                    <TechCard 
                        title="Smart Compression" 
                        desc="Гидравлический пресс сжимает тару в 7 раз. Один фандомат вмещает до 1000 бутылок, что снижает частоту обслуживания."
                        icon={<Database size={32} />}
                        color="text-purple-400"
                        bg="from-purple-500/20 to-transparent"
                    />
                </div>
                </div>
            </section>

            <section id="app-preview" className="py-16 md:py-24 bg-gradient-to-b from-slate-900 to-black overflow-hidden relative z-10">
                <div className="container mx-auto px-4 md:px-6 2xl:px-12 max-w-7xl 2xl:max-w-[1600px] flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    <div className="w-full lg:w-1/2 z-10 order-2 lg:order-1">
                        <SectionHeader title="Приложение EcoReward" subtitle="Твой карманный эколог" align="left" />
                        <ul className="space-y-6 md:space-y-8 mt-8">
                            <AppFeature icon={<MapPin className="text-red-400" size={28}/>} title="Интерактивная карта" desc="Находи ближайшие свободные фандоматы за секунду." />
                            <AppFeature icon={<TrendingUp className="text-emerald-400" size={28}/>} title="Статистика доходов" desc="Прозрачная история всех сданных бутылок и начислений." />
                            <AppFeature icon={<Award className="text-yellow-400" size={28}/>} title="Лига чемпионов" desc="Соревнуйся с друзьями и получай уникальные бейджи." />
                        </ul>
                        <div className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4">
                            <StoreButton type="apple" />
                            <StoreButton type="google" />
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 flex justify-center relative perspective-1000 order-1 lg:order-2 mt-8 lg:mt-0">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-emerald-500/20 rounded-full blur-[100px] md:blur-[120px] animate-pulse"></div>
                        <div className="relative w-[280px] h-[580px] md:w-[320px] md:h-[640px] 2xl:w-[400px] 2xl:h-[800px] bg-slate-950 rounded-[2.5rem] md:rounded-[3rem] border-[6px] md:border-8 border-slate-800 shadow-2xl overflow-hidden transform lg:rotate-y-12 lg:hover:rotate-y-0 transition-transform duration-700">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 md:w-40 2xl:w-48 h-5 md:h-6 2xl:h-8 bg-slate-800 rounded-b-xl z-20"></div>
                            
                            <div className="w-full h-full bg-slate-900 pt-8 md:pt-10 2xl:pt-14 px-4 2xl:px-6 relative flex flex-col">
                                <div className="flex justify-between items-center mb-6 2xl:mb-8">
                                    <Menu className="text-slate-400 w-5 h-5 2xl:w-7 2xl:h-7"/>
                                    <span className="font-bold text-emerald-400 2xl:text-xl">EcoReward</span>
                                    <div className="w-8 h-8 2xl:w-10 2xl:h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs 2xl:text-sm">АС</div>
                                </div>
                                
                                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl 2xl:rounded-3xl p-5 md:p-6 2xl:p-8 mb-6 2xl:mb-8 shadow-lg shadow-emerald-500/30 text-white flex-shrink-0">
                                    <p className="text-emerald-100 text-xs 2xl:text-sm mb-1">Ваш баланс</p>
                                    <h3 className="text-3xl 2xl:text-4xl font-bold mb-4">12,450 ₸</h3>
                                    <div className="flex gap-2">
                                        <button className="bg-white/20 px-3 py-1 2xl:px-4 2xl:py-2 rounded-lg text-xs 2xl:text-sm backdrop-blur-sm">Вывести</button>
                                        <button className="bg-white/20 px-3 py-1 2xl:px-4 2xl:py-2 rounded-lg text-xs 2xl:text-sm backdrop-blur-sm">История</button>
                                    </div>
                                </div>
                                
                                <div className="space-y-3 2xl:space-y-4 flex-grow overflow-y-auto pb-20">
                                    <div className="text-xs 2xl:text-sm text-slate-500 uppercase font-bold tracking-wider sticky top-0 bg-slate-900 py-1">История операций</div>
                                    <AppListItem icon={<Recycle className="text-emerald-400 w-4 h-4 2xl:w-5 2xl:h-5"/>} title="Сдано: 15 ПЭТ" time="10:30" amount="+900 ₸" />
                                    <AppListItem icon={<Recycle className="text-blue-400 w-4 h-4 2xl:w-5 2xl:h-5"/>} title="Сдано: 5 ALU" time="Вчера" amount="+2500 ₸" />
                                    <AppListItem icon={<CreditCard className="text-red-400 w-4 h-4 2xl:w-5 2xl:h-5"/>} title="Вывод Kaspi" time="12.02.26" amount="-5000 ₸" />
                                    <AppListItem icon={<Recycle className="text-emerald-400 w-4 h-4 2xl:w-5 2xl:h-5"/>} title="Сдано: 2 ПЭТ" time="10.02.26" amount="+120 ₸" />
                                </div>

                                <div className="absolute bottom-0 left-0 w-full h-16 2xl:h-20 bg-slate-800 flex justify-around items-center text-slate-400">
                                    <div className="text-emerald-400 flex flex-col items-center"><Recycle className="w-5 h-5 2xl:w-6 2xl:h-6"/><span className="text-[10px] 2xl:text-xs mt-1">Главная</span></div>
                                    <div className="flex flex-col items-center"><MapPin className="w-5 h-5 2xl:w-6 2xl:h-6"/><span className="text-[10px] 2xl:text-xs mt-1">Карта</span></div>
                                    <div className="flex flex-col items-center"><Users className="w-5 h-5 2xl:w-6 2xl:h-6"/><span className="text-[10px] 2xl:text-xs mt-1">Профиль</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="partners" className="py-16 md:py-24 bg-black relative z-10">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                
                <div className="container mx-auto px-4 md:px-6 2xl:px-12 max-w-7xl 2xl:max-w-[1600px] relative z-10">
                <SectionHeader title="Надежные Партнеры" subtitle="Компании, которые меняют мир вместе с нами" />
                
                <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-12">
                    {[ {id:'all', t:'Все'}, {id:'finance', t:'Финансы'}, {id:'ecology', t:'Экология'}, {id:'tech', t:'Tech & Retail'} ].map(btn => (
                    <button key={btn.id} onClick={() => setPartnerFilter(btn.id)} className={`px-4 py-2 md:px-6 md:py-2 rounded-full text-[10px] md:text-xs 2xl:text-sm font-bold uppercase tracking-wider transition-all border ${partnerFilter === btn.id ? 'bg-emerald-500 border-emerald-500 text-white shadow-[0_0_15px_#10b981]' : 'bg-transparent border-slate-700 text-slate-500 hover:border-emerald-400 hover:text-white'}`}>
                        {btn.t}
                    </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 2xl:gap-8">
                    {filteredPartners.map((partner) => (
                        <div key={partner.id} className={`group relative bg-slate-900/60 backdrop-blur-md border border-white/5 p-6 md:p-8 2xl:p-10 rounded-2xl md:rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:bg-slate-800 ${partner.border} overflow-hidden shadow-xl`}>
                            <div className={`absolute inset-0 bg-gradient-to-br ${partner.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                            <div className={`absolute top-0 right-0 p-2 md:p-3 rounded-bl-xl md:rounded-bl-2xl bg-slate-950 border-b border-l border-white/5 ${partner.color}`}>
                                <ExternalLink size={14} className="md:w-4 md:h-4 2xl:w-5 2xl:h-5" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-4 md:mb-6">
                                    <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl ${partner.bg} ${partner.color} shadow-lg ring-1 ring-white/10`}>
                                        {React.cloneElement(partner.icon, { className: "w-6 h-6 md:w-7 md:h-7 2xl:w-9 2xl:h-9" })}
                                    </div>
                                    <div>
                                        <h3 className="text-lg md:text-xl 2xl:text-2xl font-bold text-white leading-tight">{partner.name}</h3>
                                        <span className="text-[10px] md:text-xs 2xl:text-sm text-slate-500 uppercase tracking-widest font-bold">{partner.role}</span>
                                    </div>
                                </div>
                                <p className="text-slate-400 text-xs md:text-sm 2xl:text-base mb-4 md:mb-6 leading-relaxed border-t border-white/5 pt-4 min-h-[40px] md:min-h-[60px]">
                                    {partner.desc}
                                </p>
                                <a href={partner.link} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 text-xs md:text-sm 2xl:text-base font-bold uppercase tracking-wider ${partner.color} hover:underline`}>
                                    Перейти на сайт <ArrowRight size={14} className="2xl:w-5 2xl:h-5"/>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
                </div>
            </section>

            <section id="faq" className="py-16 md:py-24 bg-slate-900 relative z-10">
                <div className="container mx-auto px-4 md:px-6 2xl:px-12 max-w-4xl 2xl:max-w-6xl">
                    <SectionHeader title="Вопросы и ответы" subtitle="Всё, что нужно знать перед стартом" />
                    <div className="space-y-3 md:space-y-4">
                        {FAQ_DATA.map((item, index) => (
                            <div key={index} className={`border rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 ${openFaqIndex === index ? 'bg-slate-800/80 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'bg-slate-950/50 border-white/10 hover:border-white/20'}`}>
                                <button 
                                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                                    className="w-full flex justify-between items-center p-4 md:p-6 text-left"
                                >
                                    <span className={`font-bold text-base md:text-lg 2xl:text-xl ${openFaqIndex === index ? 'text-emerald-400' : 'text-white'}`}>{item.q}</span>
                                    {openFaqIndex === index ? <ChevronUp className="text-emerald-400 shrink-0 ml-4" /> : <ChevronDown className="text-slate-500 shrink-0 ml-4" />}
                                </button>
                                <div className={`px-4 md:px-6 text-slate-300 text-sm md:text-base 2xl:text-lg leading-relaxed overflow-hidden transition-all duration-300 ${openFaqIndex === index ? 'max-h-[500px] pb-4 md:pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    {item.a}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-gradient-to-t from-black to-slate-900 z-10 relative">
                <div className="container mx-auto px-4 md:px-6 2xl:px-12 max-w-7xl 2xl:max-w-[1600px]">
                    <div className="grid lg:grid-cols-2 gap-10 md:gap-16">
                        
                        <div>
                            <h3 className="text-xl md:text-2xl 2xl:text-3xl font-black uppercase mb-6 md:mb-8 flex items-center gap-2"><Star className="text-yellow-400 fill-yellow-400" /> Отзывы пользователей</h3>
                            
                            <div className="relative bg-slate-800/50 p-6 md:p-8 2xl:p-12 rounded-2xl md:rounded-3xl border border-white/5 min-h-[250px] md:min-h-[280px] 2xl:min-h-[350px] flex flex-col justify-center">
                                <div className="absolute top-2 right-4 md:top-4 md:right-6 text-5xl md:text-6xl 2xl:text-8xl text-slate-700 font-serif opacity-50">"</div>
                                
                                <div className={`transition-opacity duration-300 ${isReviewFading ? 'opacity-0' : 'opacity-100'}`}>
                                    <div className="flex gap-1 mb-3 md:mb-4">
                                        {[...Array(REVIEWS[currentReview].stars)].map((_, i) => <Star key={i} size={16} className="text-yellow-400 fill-yellow-400 md:w-4 md:h-4 2xl:w-5 2xl:h-5"/>)}
                                    </div>
                                    <p className="text-slate-300 text-base md:text-lg 2xl:text-xl mb-6 md:mb-8 italic leading-relaxed">
                                        "{REVIEWS[currentReview].text}"
                                    </p>
                                    <div className="flex items-center gap-3 md:gap-4">
                                        <div className="w-10 h-10 2xl:w-14 2xl:h-14 rounded-full bg-emerald-500/20 flex items-center justify-center font-bold text-emerald-400 text-sm 2xl:text-lg">
                                            {REVIEWS[currentReview].name[0]}
                                        </div>
                                        <div>
                                            <div className="font-bold text-white text-sm md:text-base 2xl:text-xl">{REVIEWS[currentReview].name}</div>
                                            <div className="text-[10px] md:text-xs 2xl:text-sm text-emerald-400 uppercase tracking-wider">{REVIEWS[currentReview].role}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute bottom-3 md:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 md:gap-2 overflow-x-auto max-w-full px-4 hide-scrollbar">
                                    {REVIEWS.map((_, i) => (
                                        <button 
                                            key={i} 
                                            onClick={() => changeReview(i)}
                                            className={`h-1.5 md:h-2 rounded-full transition-all duration-300 shrink-0 ${i === currentReview ? 'bg-emerald-400 w-4 md:w-6' : 'bg-slate-600 w-1.5 md:w-2 hover:bg-slate-400'}`}
                                            aria-label={`Go to review ${i + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-emerald-900/40 to-slate-900 p-6 md:p-8 2xl:p-12 rounded-2xl md:rounded-3xl border border-emerald-500/20 flex flex-col justify-center">
                            <div className="mb-4 md:mb-6 w-12 h-12 md:w-16 md:h-16 2xl:w-20 2xl:h-20 bg-emerald-500 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                <Mail className="text-white w-6 h-6 md:w-8 md:h-8 2xl:w-10 2xl:h-10"/>
                            </div>
                            <h3 className="text-2xl md:text-3xl 2xl:text-4xl font-bold mb-2">Ранний доступ</h3>
                            <p className="text-slate-400 text-sm md:text-base 2xl:text-lg mb-6 md:mb-8">Оставьте почту, чтобы получить приглашение в закрытый клуб EcoReward и +500 бонусов на старт.</p>
                            
                            {!subscribed ? (
                                <form onSubmit={handleSubscribe} className="space-y-3 md:space-y-4">
                                    <input 
                                        type="email" 
                                        placeholder="Ваш email адрес" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="select-text w-full bg-slate-950 border border-slate-700 rounded-xl p-3 md:p-4 2xl:p-5 2xl:text-lg focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all text-white"
                                        required
                                    />
                                    <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 md:py-4 2xl:py-5 2xl:text-lg rounded-xl transition-all shadow-lg hover:shadow-emerald-500/20 uppercase tracking-wider">
                                        Вступить в клуб
                                    </button>
                                </form>
                            ) : (
                                <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-300 p-4 md:p-6 2xl:p-8 rounded-xl flex items-center gap-3 animate-fade-in-up">
                                    <CheckCircle className="w-6 h-6 md:w-8 md:h-8 shrink-0" />
                                    <div>
                                        <div className="font-bold 2xl:text-xl">Вы успешно подписались!</div>
                                        <div className="text-xs md:text-sm 2xl:text-base opacity-80">Проверьте почту.</div>
                                    </div>
                                </div>
                            )}
                            <p className="text-[10px] md:text-xs 2xl:text-sm text-slate-600 mt-4 md:mt-6 text-center">Никакого спама. Только польза.</p>
                        </div>
                    </div>
                </div>
            </section>
          </>
      ) : (
          <SubPage pageId={currentPage} onBack={() => navigateTo('home')} />
      )}
      </main>

      <footer className="bg-black border-t border-white/10 pt-16 md:pt-20 pb-8 md:pb-10 relative z-10 mt-auto">
        <div className="container mx-auto px-4 md:px-6 2xl:px-12 max-w-7xl 2xl:max-w-[1600px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
                <div className="col-span-1 lg:col-span-2">
                    <div className="text-2xl md:text-3xl font-black flex items-center gap-2 mb-4 md:mb-6 text-white cursor-pointer w-fit" onClick={() => navigateTo('home')}>
                        <Recycle className="text-emerald-500" size={32} /> ECO<span className="text-emerald-500">REWARD</span>
                    </div>
                    <p className="text-slate-500 text-sm md:text-base 2xl:text-lg max-w-sm mb-6 leading-relaxed">
                        Мы создаем будущее, в котором отходы становятся ценным ресурсом. 
                        Присоединяйтесь к движению за чистый Казахстан и зарабатывайте на этом.
                    </p>
                    <div className="flex gap-3 md:gap-4">
                        <SocialIcon icon={<Instagram size={18} />} href="#" />
                        <SocialIcon icon={<Youtube size={18} />} href="#" />
                        <SocialIcon icon={<Globe size={18} />} href="#" />
                    </div>
                </div>
                <div>
                     <h4 className="font-bold text-white mb-4 md:mb-6 uppercase tracking-wider text-xs md:text-sm 2xl:text-base">Компания</h4>
                     <ul className="space-y-3 md:space-y-4 text-slate-500 text-sm 2xl:text-base">
                         {FOOTER_LINKS.map((link, i) => (
                             <li 
                                key={i} 
                                onClick={() => navigateTo(link.id)}
                                className={`cursor-pointer transition-colors flex items-center gap-2 group w-fit ${currentPage === link.id ? 'text-emerald-400 font-bold' : 'hover:text-emerald-400'}`}
                             >
                                 <span className={`w-1 h-1 bg-emerald-500 rounded-full transition-opacity ${currentPage === link.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span>
                                 {link.label}
                             </li>
                         ))}
                     </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-4 md:mb-6 uppercase tracking-wider text-xs md:text-sm 2xl:text-base">Контакты</h4>
                    <div className="space-y-3 md:space-y-4 text-sm 2xl:text-base">
                        <div className="flex items-start gap-3 text-slate-500">
                            <MapPin size={16} className="mt-1 text-emerald-500 shrink-0"/>
                            <span>Алматы, ул. Сатпаева 22,<br/>БЦ "Smart City", офис 404</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-500">
                            <Mail size={16} className="text-emerald-500 shrink-0"/>
                            <span>hello@ecoreward.kz</span>
                        </div>
                        <div className="flex items-center gap-3 text-emerald-400 font-bold text-base md:text-lg 2xl:text-xl">
                            <Smartphone size={16} className="shrink-0"/>
                            <span>+7 (705) 152-49-41</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t border-white/10 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs 2xl:text-sm text-slate-600">
                <p 
    className="mb-4 md:mb-0 cursor-default hover:text-emerald-500 transition-colors"
    onClick={(e) => {
        if (e.detail === 5) {
            e.target.innerText = "Сделано с 💚 и бессонными ночами ради автомата по защите проекта";
        }
    }}
>
    © 2026 EcoReward Startup. Все права защищены.
		</p>
                <div className="flex gap-4 md:gap-6">
                    <span className="hover:text-slate-400 cursor-pointer">Политика конфиденциальности</span>
                    <span className="hover:text-slate-400 cursor-pointer">Условия использования</span>
                </div>
            </div>
        </div>
      </footer>

      {isCalcOpen && <CalculatorModal onClose={() => setIsCalcOpen(false)} />}
    </div>
  );
};

// 3. КОМПОНЕНТЫ ВНУТРЕННИХ СТРАНИЦ

const SubPage = ({ pageId, onBack }) => {
    const pagesContent = {
        about: {
            title: "О нас",
            subtitle: "Меняем отношение к отходам",
            icon: <Leaf className="text-emerald-400" size={40} />,
            content: (
                <div className="space-y-4 md:space-y-6 text-slate-300 leading-relaxed text-sm md:text-base 2xl:text-xl">
                    <p className="text-lg md:text-xl 2xl:text-2xl text-white font-medium">EcoReward - это стартап, родившийся в Алматы в 2026 году из простой идеи: <span className="text-emerald-400">экология должна быть выгодной.</span></p>
                    <p>Мы обратили внимание, что традиционные методы агитации за сортировку мусора работают плохо. Людям не хватает мотивации. Поэтому мы решили объединить технологии (IoT, Computer Vision) и финансовый стимул (мгновенные выплаты на Kaspi).</p>
                    <p>Наша миссия - создать крупнейшую децентрализованную сеть по сбору вторсырья в Центральной Азии, где каждый участник цепочки получает выгоду.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
                        <div className="bg-slate-950 p-4 md:p-6 rounded-xl md:rounded-2xl border border-white/5 text-center">
                            <div className="text-2xl md:text-3xl 2xl:text-4xl font-black text-white mb-1 md:mb-2">12 Тонн</div>
                            <div className="text-[10px] md:text-xs 2xl:text-sm text-slate-500 uppercase">Перерабатываем ежедневно</div>
                        </div>
                        <div className="bg-slate-950 p-4 md:p-6 rounded-xl md:rounded-2xl border border-white/5 text-center">
                            <div className="text-2xl md:text-3xl 2xl:text-4xl font-black text-white mb-1 md:mb-2">50+</div>
                            <div className="text-[10px] md:text-xs 2xl:text-sm text-slate-500 uppercase">Фандоматов в Алматы</div>
                        </div>
                        <div className="bg-slate-950 p-4 md:p-6 rounded-xl md:rounded-2xl border border-white/5 text-center">
                            <div className="text-2xl md:text-3xl 2xl:text-4xl font-black text-white mb-1 md:mb-2">2026</div>
                            <div className="text-[10px] md:text-xs 2xl:text-sm text-slate-500 uppercase">Год выхода в Астану</div>
                        </div>
                    </div>
                </div>
            )
        },
        team: {
            title: "Команда",
            subtitle: "Люди, стоящие за EcoReward",
            icon: <Users className="text-emerald-400" size={40} />,
            content: (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {[
                        { name: "Эмиль И.", role: "CEO & Founder", desc: "Эксперт в области GreenTech и устойчивого развития. Руководит стратегией." },
                        { name: "Алихан Ә.", role: "IT-специалист", desc: "Архитектор AI-системы распознавания фандоматов и backend-разработчик." },
                        { name: "Валерия А.", role: "COO", desc: "Управляет логистикой вывоза мусора и партнерскими отношениями с Magnum." }
                    ].map((member, i) => (
                        <div key={i} className="bg-slate-950 p-6 2xl:p-8 rounded-xl md:rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-colors">
                            <div className="w-12 h-12 md:w-16 md:h-16 2xl:w-20 2xl:h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-emerald-400">
                                <User className="w-6 h-6 md:w-8 md:h-8 2xl:w-10 2xl:h-10" />
                            </div>
                            <h4 className="text-base md:text-lg 2xl:text-xl font-bold text-white">{member.name}</h4>
                            <p className="text-emerald-400 text-xs md:text-sm 2xl:text-base mb-2 md:mb-3">{member.role}</p>
                            <p className="text-slate-400 text-xs md:text-sm 2xl:text-base">{member.desc}</p>
                        </div>
                    ))}
                </div>
            )
        },
        career: {
            title: "Карьера",
            subtitle: "Присоединяйся к зеленой революции",
            icon: <Briefcase className="text-emerald-400" size={40} />,
            content: (
                <div className="space-y-4 md:space-y-6">
                    <p className="text-slate-300 text-sm md:text-base 2xl:text-xl mb-6 md:mb-8">Мы всегда ищем таланты, которые хотят не просто писать код, а делать мир чище.</p>
                    {[
                        { title: "React Native Developer", type: "Full-time", loc: "Алматы / Remote", salary: "от 800,000 ₸" },
                        { title: "IoT Hardware Engineer", type: "Full-time", loc: "Алматы (Офис)", salary: "от 600,000 ₸" },
                        { title: "Менеджер по развитию сети", type: "Full-time", loc: "Алматы", salary: "от 400,000 ₸ + %" }
                    ].map((job, i) => (
                        <div key={i} className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-slate-950 p-4 md:p-6 2xl:p-8 rounded-xl md:rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-colors gap-4">
                            <div>
                                <h4 className="text-base md:text-lg 2xl:text-xl font-bold text-white mb-2">{job.title}</h4>
                                <div className="flex flex-wrap gap-2 md:gap-4 text-[10px] md:text-xs 2xl:text-sm text-slate-500 font-mono">
                                    <span className="bg-slate-900 px-2 py-1 rounded">{job.type}</span>
                                    <span className="bg-slate-900 px-2 py-1 rounded">{job.loc}</span>
                                    <span className="bg-emerald-900/30 text-emerald-400 px-2 py-1 rounded">{job.salary}</span>
                                </div>
                            </div>
                            <button className="w-full lg:w-auto px-6 py-3 bg-slate-800 hover:bg-emerald-500 text-white rounded-lg transition-colors text-xs md:text-sm 2xl:text-base font-bold uppercase tracking-wider">
                                Откликнуться
                            </button>
                        </div>
                    ))}
                </div>
            )
        },
        investors: {
            title: "Инвесторам",
            subtitle: "Бизнес-модель и метрики",
            icon: <PieChart className="text-emerald-400" size={40} />,
            content: (
                <div className="space-y-6 md:space-y-8">
                    <div className="bg-slate-950 p-6 md:p-8 2xl:p-10 rounded-xl md:rounded-2xl border border-white/5 text-slate-300 leading-relaxed text-sm md:text-base 2xl:text-lg">
                        <h4 className="text-lg md:text-xl 2xl:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <TrendingUp className="text-emerald-400" /> Traction & Рост
                        </h4>
                        <p className="mb-4">Наш стартап демонстрирует рост активных пользователей (MAU) на 35% месяц к месяцу. Бизнес-модель основана на марже между стоимостью выплаты пользователю (в среднем 70 ₸/кг ПЭТ) и оптовой продажей чистого сырья перерабатывающим заводам (до 250 ₸/кг).</p>
                        <p>Дополнительная монетизация: рекламные интеграции на экранах фандоматов и продажа Big Data производителям FMCG.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                        <div className="bg-slate-950 p-4 md:p-6 2xl:p-8 rounded-xl md:rounded-2xl border border-white/5 flex items-center justify-between">
                            <div>
                                <h5 className="font-bold text-white text-sm md:text-base 2xl:text-xl">Рынок (SAM) в РК</h5>
                                <p className="text-slate-400 text-[10px] md:text-xs 2xl:text-sm">Потенциал переработки</p>
                            </div>
                            <div className="text-xl md:text-2xl 2xl:text-4xl font-black text-emerald-400">$120M+</div>
                        </div>
                        <div className="bg-slate-950 p-4 md:p-6 2xl:p-8 rounded-xl md:rounded-2xl border border-white/5 flex items-center justify-between">
                            <div>
                                <h5 className="font-bold text-white text-sm md:text-base 2xl:text-xl">Текущий Раунд</h5>
                                <p className="text-slate-400 text-[10px] md:text-xs 2xl:text-sm">Seed раунд (Открыт)</p>
                            </div>
                            <div className="text-xl md:text-2xl 2xl:text-4xl font-black text-blue-400">$500K</div>
                        </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold py-4 2xl:py-5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 2xl:text-lg">
                        <FileText size={20} /> Скачать Pitch Deck (PDF)
                    </button>
                </div>
            )
        }
    };

    const current = pagesContent[pageId];

    if (!current) {
        onBack();
        return null;
    }

    return (
        <div className="pt-28 md:pt-36 2xl:pt-48 pb-16 md:pb-24 px-4 md:px-6 relative z-10 animate-fade-in flex-grow">
            <div className="container mx-auto max-w-4xl 2xl:max-w-6xl">
                <button 
                    onClick={onBack} 
                    className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 mb-8 md:mb-12 transition-colors font-bold uppercase tracking-widest text-[10px] md:text-xs 2xl:text-sm"
                >
                    <ArrowLeft size={16} /> Вернуться на главную
                </button>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 mb-8 md:mb-12">
                    <div className="p-3 md:p-4 bg-slate-900 rounded-xl md:rounded-2xl border border-white/10 shadow-lg shadow-emerald-900/20">
                        {React.cloneElement(current.icon, { className: "w-8 h-8 md:w-10 md:h-10 2xl:w-12 2xl:h-12" })}
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl 2xl:text-6xl font-black text-white uppercase tracking-tight mb-1 md:mb-2">{current.title}</h1>
                        <p className="text-emerald-400 uppercase tracking-widest text-[10px] md:text-xs 2xl:text-sm font-bold">{current.subtitle}</p>
                    </div>
                </div>

                <div className="bg-slate-900/60 p-6 md:p-8 2xl:p-12 rounded-2xl md:rounded-[2rem] border border-white/5 backdrop-blur-xl shadow-2xl">
                    {current.content}
                </div>
            </div>
        </div>
    );
};

// 4. ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ

const TickerItem = ({ label, text }) => (
    <div className="flex items-center gap-2 md:gap-3 mx-4 md:mx-8">
        <span className="bg-emerald-500/20 text-emerald-400 text-[8px] md:text-[10px] 2xl:text-xs px-1.5 py-0.5 md:px-2 rounded border border-emerald-500/30">{label}</span>
        <span>{text}</span>
    </div>
);

const FloatingIcon = ({ icon, top, left, right, bottom, delay, duration }) => (
    <div 
        className="absolute text-emerald-500/20 animate-float pointer-events-none hidden md:block"
        style={{ top, left, right, bottom, animationDelay: delay, animationDuration: duration || '6s' }}
    >
        {icon}
    </div>
);

const AnimatedStat = ({ icon, target, suffix, label, color }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        let start = 0;
        const duration = 2500;
        const stepTime = Math.abs(Math.floor(duration / target));
        const increment = target > 1000 ? Math.ceil(target / 100) : 1;

        const timer = setInterval(() => {
            start += increment;
            if (start > target) start = target;
            setCount(start);
            if (start >= target) clearInterval(timer);
        }, target > 1000 ? 20 : stepTime);
        return () => clearInterval(timer);
    }, [target]);

    return (
        <div className="text-center p-4 md:p-6 bg-slate-900/40 rounded-2xl md:rounded-3xl border border-white/5 group hover:border-emerald-500/30 transition-all">
            <div className={`flex justify-center mb-3 md:mb-4 text-slate-600 group-hover:${color} transition-colors duration-500 scale-110 md:scale-125 2xl:scale-150`}>
                {React.cloneElement(icon, { className: "w-6 h-6 md:w-8 md:h-8" })}
            </div>
            <div className="text-2xl md:text-3xl lg:text-4xl 2xl:text-6xl font-black text-white mb-1 md:mb-2 font-mono tracking-tighter">
                {count.toLocaleString()}{suffix}
            </div>
            <div className="text-slate-500 text-[10px] md:text-xs 2xl:text-sm uppercase tracking-wider font-bold">{label}</div>
        </div>
    );
};

const TechCard = ({ title, desc, icon, color, bg }) => (
    <div className="group relative p-6 md:p-8 2xl:p-10 rounded-2xl md:rounded-3xl bg-slate-900/60 border border-white/5 hover:border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-2">
        <div className={`absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br ${bg} blur-[40px] md:blur-[50px] rounded-full group-hover:blur-[60px] transition-all`}></div>
        <div className="relative z-10">
            <div className={`w-12 h-12 md:w-14 md:h-14 2xl:w-16 2xl:h-16 rounded-xl md:rounded-2xl bg-slate-950 flex items-center justify-center mb-4 md:mb-6 shadow-lg border border-white/5 group-hover:scale-110 transition-transform ${color}`}>
                {React.cloneElement(icon, { className: "w-6 h-6 md:w-8 md:h-8" })}
            </div>
            <h3 className="text-xl md:text-2xl 2xl:text-3xl font-bold text-white mb-2 md:mb-3">{title}</h3>
            <p className="text-slate-400 text-sm md:text-base 2xl:text-lg leading-relaxed">{desc}</p>
        </div>
    </div>
);

const AppListItem = ({ icon, title, time, amount }) => (
    <div className="flex items-center justify-between bg-slate-800/50 p-2.5 md:p-3 2xl:p-4 rounded-xl border border-white/5">
        <div className="flex items-center gap-2 md:gap-3">
            <div className="p-1.5 md:p-2 bg-slate-900 rounded-lg">{icon}</div>
            <div>
                <div className="text-[10px] md:text-xs 2xl:text-sm text-white font-bold">{title}</div>
                <div className="text-[8px] md:text-[10px] 2xl:text-xs text-slate-500">{time}</div>
            </div>
        </div>
        <div className={`text-[10px] md:text-xs 2xl:text-sm font-bold ${amount.includes('+') ? 'text-emerald-400' : 'text-slate-300'}`}>{amount}</div>
    </div>
);

const AppFeature = ({ icon, title, desc }) => (
    <div className="flex gap-3 md:gap-4">
        <div className="mt-1 p-2 md:p-3 2xl:p-4 bg-slate-900 rounded-xl border border-white/10 h-fit shadow-lg">
            {React.cloneElement(icon, { className: "w-5 h-5 md:w-7 md:h-7 2xl:w-8 2xl:h-8" })}
        </div>
        <div>
            <h4 className="text-lg md:text-xl 2xl:text-2xl font-bold text-white mb-1">{title}</h4>
            <p className="text-slate-400 text-xs md:text-sm 2xl:text-base leading-relaxed">{desc}</p>
        </div>
    </div>
);

const StoreButton = ({ type }) => (
    <button className="flex items-center gap-2 md:gap-3 bg-slate-900 border border-white/10 px-4 py-2.5 md:px-5 md:py-3 2xl:px-6 2xl:py-4 rounded-xl hover:bg-slate-800 hover:border-emerald-500/30 transition-all w-full sm:w-40 md:w-44 2xl:w-56 justify-center">
        {type === 'apple' ? (
            <>
                <div className="text-xl md:text-2xl 2xl:text-3xl"></div>
                <div className="text-left leading-none">
                    <div className="text-[8px] md:text-[9px] 2xl:text-[11px] uppercase tracking-wide text-slate-500">Download on</div>
                    <div className="text-xs md:text-sm 2xl:text-lg font-bold text-white">App Store</div>
                </div>
            </>
        ) : (
            <>
                <div className="text-lg md:text-xl 2xl:text-2xl">▶</div>
                <div className="text-left leading-none">
                    <div className="text-[8px] md:text-[9px] 2xl:text-[11px] uppercase tracking-wide text-slate-500">Get it on</div>
                    <div className="text-xs md:text-sm 2xl:text-lg font-bold text-white">Google Play</div>
                </div>
            </>
        )}
    </button>
);

const SectionHeader = ({ title, subtitle, align = 'center' }) => (
  <div className={`mb-10 md:mb-16 2xl:mb-20 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    <h2 className="text-2xl md:text-3xl lg:text-5xl 2xl:text-6xl font-black uppercase mb-3 md:mb-4 tracking-tight text-white drop-shadow-xl">{title}</h2>
    <div className={`w-16 md:w-24 h-1 md:h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 mb-3 md:mb-4 rounded-full ${align === 'center' ? 'mx-auto' : ''}`}></div>
    <p className="text-emerald-400 uppercase tracking-widest text-[10px] md:text-sm 2xl:text-base font-bold">{subtitle}</p>
  </div>
);

const SocialIcon = ({ icon, href }) => (
    <a href={href} className="w-10 h-10 md:w-12 md:h-12 2xl:w-14 2xl:h-14 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-emerald-500 hover:text-white transition-all hover:-translate-y-1 border border-white/10 hover:border-emerald-400">
        {icon}
    </a>
);

// 5. МОДАЛКА КАЛЬКУЛЯТОРА 5.0 (ИДЕАЛЬНЫЙ UX)

const CalculatorModal = ({ onClose }) => {
    const PRICES = { pet: { start: 60, active: 70, leader: 80 }, aluminum: { start: 500, active: 550, leader: 600 }, paper: { start: 40, active: 50, leader: 60 } };
    
    const [inputMode, setInputMode] = useState('pieces'); 
    
    const [pieces, setPieces] = useState({ pet: 15, alu: 10 });
    const [kg, setKg] = useState({ pet: 5, alu: 2, paper: 5 });
    
    const [userType, setUserType] = useState('standard');
    const [period, setPeriod] = useState(1);
    
    const weight = {
        pet: inputMode === 'pieces' ? pieces.pet * 0.04 : kg.pet,
        aluminum: inputMode === 'pieces' ? pieces.alu * 0.015 : kg.alu,
        paper: kg.paper 
    };
    
    const totalWeight = weight.pet + weight.aluminum + weight.paper;
    
    let level = 'start'; 
    if (totalWeight >= 100) level = 'leader'; 
    else if (totalWeight >= 30) level = 'active';

    const calculateIncome = () => { 
        let base = (weight.pet * PRICES.pet[level]) + (weight.aluminum * PRICES.aluminum[level]) + (weight.paper * PRICES.paper[level]); 
        if (userType === 'student') base *= 1.10; 
        if (userType === 'pensioner') base *= 1.15; 
        if (userType === 'disabled') base *= 1.20; 
        return Math.floor(base * period); 
    };

    const income = calculateIncome();
    const calculateCO2 = () => Math.floor(totalWeight * period * 0.63); 
    const calculateTrees = () => (totalWeight * period * 0.002).toFixed(2); 

    const getTargetGoal = (amount) => {
        if (amount === 0) return { text: "Начни собирать!", icon: "🌱" };
        if (amount < 200) return { text: "Поездка по ONAY!", icon: "🚌" };
        if (amount < 1500) return { text: "Кофе с собой", icon: "☕" };
        if (amount < 3500) return { text: "Комбо в фастфуде", icon: "🍔" };
        if (amount < 6000) return { text: "Подписка Spotify/Яндекс", icon: "🎵" };
        if (amount < 15000) return { text: "Оплата интернета", icon: "🌐" };
        if (amount < 50000) return { text: "Кроссовки или худи", icon: "👟" };
        if (amount < 150000) return { text: "Авиабилет по РК", icon: "✈️" };
        return { text: "Новый гаджет на Kaspi", icon: "📱" };
    };

    const goal = getTargetGoal(income);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4">
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md animate-fade-in" onClick={onClose}></div>
            <div className="relative bg-slate-900 border border-emerald-500/30 rounded-2xl md:rounded-[2rem] max-w-4xl 2xl:max-w-6xl w-full shadow-2xl animate-fade-in-up overflow-hidden flex flex-col md:flex-row max-h-[95vh] md:max-h-[90vh]">
                
                <div className="w-full md:w-1/2 p-4 md:p-8 2xl:p-12 overflow-y-auto hide-scrollbar">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            <Calculator className="text-emerald-400 w-6 h-6" />
                            <h3 className="text-xl md:text-2xl 2xl:text-3xl font-bold text-white">Расчет</h3>
                        </div>
                        <button onClick={onClose} className="p-1"><X className="text-slate-400 hover:text-white" /></button>
                    </div>

                    <div className="flex bg-slate-950 p-1 rounded-xl mb-6 border border-white/5 w-fit">
                        <button 
                            onClick={() => setInputMode('pieces')} 
                            className={`px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${inputMode === 'pieces' ? 'bg-emerald-500 text-white shadow' : 'text-slate-500 hover:text-white'}`}
                        >
                            В штуках
                        </button>
                        <button 
                            onClick={() => setInputMode('kg')} 
                            className={`px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${inputMode === 'kg' ? 'bg-emerald-500 text-white shadow' : 'text-slate-500 hover:text-white'}`}
                        >
                            В килограммах
                        </button>
                    </div>

                    <div className="space-y-6 md:space-y-8 mb-8">
                        {inputMode === 'pieces' ? (
                            <>
                                <SliderRow label="ПЭТ Бутылки (шт)" icon={<ShieldCheck className="text-blue-400 w-5 h-5"/>} val={pieces.pet} set={(v) => setPieces({...pieces, pet: v})} max={200} step={1} />
                                <SliderRow label="Алюм. банки (шт)" icon={<Zap className="text-yellow-400 w-5 h-5"/>} val={pieces.alu} set={(v) => setPieces({...pieces, alu: v})} max={200} step={1} />
                            </>
                        ) : (
                            <>
                                <SliderRow label="ПЭТ Бутылки (кг)" icon={<ShieldCheck className="text-blue-400 w-5 h-5"/>} val={kg.pet} set={(v) => setKg({...kg, pet: v})} max={100} step={1} />
                                <SliderRow label="Алюм. банки (кг)" icon={<Zap className="text-yellow-400 w-5 h-5"/>} val={kg.alu} set={(v) => setKg({...kg, alu: v})} max={50} step={1} />
                            </>
                        )}
                        
                        <div className="pt-4 border-t border-white/10">
                            <div className="text-[10px] md:text-xs text-slate-500 mb-4 uppercase tracking-wider font-bold">Принимается только по весу:</div>
                            <SliderRow label="Макулатура (кг)" icon={<Leaf className="text-emerald-400 w-5 h-5"/>} val={kg.paper} set={(v) => setKg({...kg, paper: v})} max={100} step={1} />
                        </div>
                    </div>
                    
                    <div className="mb-6">
                        <div className="text-sm font-bold text-slate-400 mb-3">Социальный статус (Бонусы)</div>
                        <div className="grid grid-cols-2 gap-2">
                            {['standard', 'student', 'pensioner', 'disabled'].map(type => ( 
                                <button key={type} onClick={() => setUserType(type)} className={`px-2 py-3 rounded-xl text-xs font-bold uppercase transition-all border ${userType === type ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-950 border-white/5 text-slate-500 hover:border-slate-500'}`}>
                                    {type === 'standard' ? 'Обычный' : type === 'student' ? 'Студент (+10%)' : type === 'pensioner' ? 'Пенсионер (+15%)' : 'Особый (+20%)'}
                                </button> 
                            ))}
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/2 bg-gradient-to-br from-emerald-950 to-slate-950 p-6 md:p-8 2xl:p-12 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none"></div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex bg-slate-900 rounded-xl p-1 mb-8 border border-white/5 w-fit mx-auto md:mx-0">
                            <button onClick={() => setPeriod(1)} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${period === 1 ? 'bg-slate-800 text-white shadow' : 'text-slate-500 hover:text-white'}`}>За месяц</button>
                            <button onClick={() => setPeriod(12)} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${period === 12 ? 'bg-emerald-500 text-white shadow' : 'text-slate-500 hover:text-white'}`}>Прогноз на год</button>
                        </div>

                        <div className="mb-8 text-center md:text-left">
                            <p className="text-emerald-400 text-sm font-bold uppercase tracking-widest mb-2">Ваш чистый доход</p>
                            <h2 className="text-5xl md:text-6xl 2xl:text-7xl font-black text-white mb-4 drop-shadow-lg">
                                {income.toLocaleString()} <span className="text-2xl md:text-3xl text-emerald-500">₸</span>
                            </h2>
                            
                            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                                <span className="text-2xl">{goal.icon}</span>
                                <span className="text-slate-300 text-sm font-medium">Хватит на: <strong className="text-white">{goal.text}</strong></span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 flex-grow md:flex-grow-0 mb-8">
                            <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                                <div className="text-emerald-400 mb-2"><Wind className="w-6 h-6"/></div>
                                <div className="text-2xl font-bold text-white mb-1">{calculateCO2()} <span className="text-sm font-normal text-slate-500">кг</span></div>
                                <div className="text-[10px] text-slate-400 uppercase tracking-wider">CO2 предотвращено</div>
                            </div>
                            <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                                <div className="text-green-400 mb-2"><Trees className="w-6 h-6"/></div>
                                <div className="text-2xl font-bold text-white mb-1">{calculateTrees()}</div>
                                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Деревьев спасено</div>
                            </div>
                        </div>

                        <button className="w-full mt-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black uppercase tracking-wider py-4 2xl:py-5 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-1">
                            Начать копить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SliderRow = ({ label, val, set, max, step, icon }) => ( 
    <div> 
        <div className="flex justify-between items-center mb-3"> 
            <span className="flex items-center gap-2 text-sm md:text-base font-bold text-slate-300">{icon} {label}</span> 
            <input 
                type="number" 
                value={val}
                onChange={(e) => {
                    let newVal = parseInt(e.target.value) || 0;
                    if (newVal > max) newVal = max;
                    if (newVal < 0) newVal = 0;
                    set(newVal);
                }}
                className="select-text bg-slate-950 border border-white/10 px-3 py-1.5 rounded-lg text-emerald-400 font-mono font-bold w-20 text-center focus:outline-none focus:border-emerald-500 transition-colors"
            /> 
        </div> 
        <input 
            type="range" 
            min="0" 
            max={max} 
            step={step}
            value={val} 
            onChange={(e) => set(parseInt(e.target.value))} 
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400"
        /> 
    </div> 
);

export default EcoReward;
