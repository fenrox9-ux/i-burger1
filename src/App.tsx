import { FormEvent, useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft, Check, ChevronDown, Clock3, Heart, Menu, Minus, Pencil,
  Phone, Plus, Search, ShoppingBag, Star, Trash2, X
} from 'lucide-react'
import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router'

type Lang = 'UZ' | 'RU' | 'KG'
type Category = 'Burgers' | 'Sides' | 'Chicken' | 'Pizza' | 'Drinks'
type Product = { id: number; name: string; ru: string; kg: string; desc: string; ruDesc: string; kgDesc: string; price: number; category: Category; image: string; popular?: boolean; available?: boolean }

const photos = {
  burger: 'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?auto=format&fit=crop&w=1000&q=85',
  burger2: 'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?auto=format&fit=crop&w=1000&q=85',
  burger3: 'https://images.unsplash.com/photo-1574008714604-d276ef111b4a?auto=format&fit=crop&w=1000&q=85',
  burger4: 'https://images.unsplash.com/photo-1678110707493-8d05425137ac?auto=format&fit=crop&w=1000&q=85',
  fries: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=1000&q=85',
  chicken: 'https://images.unsplash.com/photo-1737837424033-ea2c49cd669f?auto=format&fit=crop&w=1000&q=85',
  pizza: 'https://images.unsplash.com/photo-1778448967079-ae633127cbd3?auto=format&fit=crop&w=1000&q=85',
  drink: 'https://images.unsplash.com/photo-1606411333059-070a6882f2ce?auto=format&fit=crop&w=1000&q=85',
}

const seedProducts: Product[] = [
  [1,'Classic Burger','Классический бургер','Классикалык бургер',220,'Burgers',photos.burger2,true],
  [2,'Cheeseburger','Чизбургер','Чизбургер',250,'Burgers',photos.burger,true],
  [3,'Double Cheeseburger','Двойной чизбургер','Кош чизбургер',350,'Burgers',photos.burger4,true],
  [4,'Crispy Chicken Burger','Хрустящий чикен бургер','Кытырак тоок бургери',280,'Chicken',photos.burger3],
  [5,'BBQ Burger','Бургер BBQ','BBQ бургер',320,'Burgers',photos.burger2],
  [6,'Spicy Burger','Острый бургер','Ачуу бургер',300,'Burgers',photos.burger3],
  [7,'Double Beef Burger','Двойной бургер с говядиной','Кош эт бургери',420,'Burgers',photos.burger4,true],
  [8,'I Burger Special','Фирменный I Burger','I Burger фирмалык',450,'Burgers',photos.burger,true],
  [9,'French Fries','Картофель фри','Фри картошка',120,'Sides',photos.fries,true],
  [10,'Loaded Cheese Fries','Фри с сыром','Сырлуу фри',220,'Sides',photos.fries],
  [11,'Chicken Nuggets','Куриные наггетсы','Тоок наггетстери',200,'Chicken',photos.chicken],
  [12,'Chicken Wings','Куриные крылышки','Тоок канаттары',280,'Chicken',photos.chicken,true],
  [13,'Chicken Wrap','Ролл с курицей','Тоок ролл',240,'Chicken',photos.chicken],
  [14,'Hot Dog','Хот-дог','Хот-дог',180,'Sides',photos.burger2],
  [15,'Pepperoni Pizza','Пицца Пепперони','Пепперони пицца',450,'Pizza',photos.pizza,true],
  [16,'Coca-Cola','Кока-Кола','Кока-Кола',100,'Drinks',photos.drink],
  [17,'Milkshake','Молочный коктейль','Сүт коктейли',180,'Drinks','https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1000&q=85'],
].map(([id,name,ru,kg,price,category,image,popular]) => ({
  id: id as number, name: name as string, ru: ru as string, kg: kg as string,
  desc: 'Freshly prepared with premium ingredients and our signature sauce.',
  ruDesc: 'Готовим свежим из отборных ингредиентов с фирменным соусом.',
  kgDesc: 'Тандалган азыктар жана фирмалык соус менен жаңы даярдалат.',
  price: price as number, category: category as Category, image: image as string,
  popular: popular as boolean, available: true
}))

const copy = {
  UZ: { home:'Bosh sahifa', menu:'Menyu', popular:'Mashhur', about:'Biz haqimizda', contact:'Aloqa', order:'Buyurtma berish', headline:'KATTA TA’M. HAQIQIY BURGERLAR.', sub:'Yangi masalliqlar. Shirali burgerlar. Unutilmas ta’m.', explore:'Menyuni ko‘rish', whatsapp:'WhatsApp orqali', fresh:'Har kuni yangi', delicious:'100% mazali', fast:'Tez buyurtma', menuTitle:'Hamma uchun mazali', menuSub:'Yangi tayyorlanadi, issiq yetkaziladi.', all:'Barchasi', add:'Savatga', search:'Taom qidirish...', sort:'Saralash', priceLow:'Arzon avval', priceHigh:'Qimmat avval', cart:'Savatingiz', empty:'Savat hozircha bo‘sh', subtotal:'Jami', clear:'Tozalash', checkout:'Buyurtma ma’lumotlari', name:'Ismingiz', phone:'Telefon raqam', address:'Yetkazish manzili', notes:'Izoh (ixtiyoriy)', send:'WhatsApp’da davom etish', details:'Tarkibi', close:'Yopish', reviews:'Mehmonlarimiz fikri', reviewSub:'Sizning fikringiz biz uchun muhim.', reviewName:'Ismingiz', reviewText:'Fikringiz', submit:'Fikr qoldirish', promise:'Haqiqiy ta’m. Halol yondashuv.', aboutText:'I BURGER — sifatli go‘sht, yangi sabzavotlar va har buyurtmada e’tibor. Biz tez ovqatni chinakam yaxshi ovqatga aylantiramiz.', hours:'Ish vaqti', everyDay:'Har kuni', location:'Bishkek, Qirg‘iziston', follow:'Bizni kuzating', added:'Savatga qo‘shildi', required:'Iltimos, kerakli maydonlarni to‘ldiring.', thanks:'Rahmat! Fikringiz demo xotirasiga saqlandi.' },
  RU: { home:'Главная', menu:'Меню', popular:'Популярное', about:'О нас', contact:'Контакты', order:'Заказать', headline:'БОЛЬШОЙ ВКУС. НАСТОЯЩИЕ БУРГЕРЫ.', sub:'Свежие ингредиенты. Сочные бургеры. Незабываемый вкус.', explore:'Смотреть меню', whatsapp:'Заказать в WhatsApp', fresh:'Всегда свежее', delicious:'100% вкусно', fast:'Быстрый заказ', menuTitle:'Вкус для каждого', menuSub:'Готовим свежим и доставляем горячим.', all:'Все', add:'В корзину', search:'Найти блюдо...', sort:'Сортировка', priceLow:'Сначала дешевле', priceHigh:'Сначала дороже', cart:'Ваша корзина', empty:'В корзине пока пусто', subtotal:'Итого', clear:'Очистить', checkout:'Данные заказа', name:'Ваше имя', phone:'Номер телефона', address:'Адрес доставки', notes:'Комментарий (необязательно)', send:'Продолжить в WhatsApp', details:'Подробнее', close:'Закрыть', reviews:'Отзывы гостей', reviewSub:'Нам важно ваше мнение.', reviewName:'Ваше имя', reviewText:'Ваш отзыв', submit:'Оставить отзыв', promise:'Настоящий вкус. Честный подход.', aboutText:'I BURGER — это качественное мясо, свежие овощи и внимание к каждому заказу. Мы превращаем фастфуд в по-настоящему хорошую еду.', hours:'Часы работы', everyDay:'Ежедневно', location:'Бишкек, Кыргызстан', follow:'Мы в соцсетях', added:'Добавлено в корзину', required:'Заполните обязательные поля.', thanks:'Спасибо! Отзыв сохранён в демо-хранилище.' },
  KG: { home:'Башкы бет', menu:'Меню', popular:'Популярдуу', about:'Биз жөнүндө', contact:'Байланыш', order:'Заказ берүү', headline:'ЧОҢ ДААМ. ЧЫНЫГЫ БУРГЕРЛЕР.', sub:'Жаңы азыктар. Ширелүү бургерлер. Унутулгус даам.', explore:'Менюну көрүү', whatsapp:'WhatsApp аркылуу', fresh:'Күн сайын жаңы', delicious:'100% даамдуу', fast:'Тез заказ', menuTitle:'Ар бирине жагымдуу', menuSub:'Жаңы даярдап, ысык жеткиребиз.', all:'Баары', add:'Себетке', search:'Тамак издөө...', sort:'Иреттөө', priceLow:'Арзанынан', priceHigh:'Кымбатынан', cart:'Себетиңиз', empty:'Себет азырынча бош', subtotal:'Жалпы', clear:'Тазалоо', checkout:'Заказ маалыматы', name:'Атыңыз', phone:'Телефон номери', address:'Жеткирүү дареги', notes:'Комментарий (милдеттүү эмес)', send:'WhatsApp’та улантуу', details:'Курамы', close:'Жабуу', reviews:'Кардарлардын пикири', reviewSub:'Сиздин пикириңиз биз үчүн маанилүү.', reviewName:'Атыңыз', reviewText:'Пикириңиз', submit:'Пикир калтыруу', promise:'Чыныгы даам. Ак ниет мамиле.', aboutText:'I BURGER — сапаттуу эт, жаңы жашылчалар жана ар бир заказга көңүл буруу. Биз фастфудду чыныгы жакшы тамакка айлантабыз.', hours:'Иш убактысы', everyDay:'Күн сайын', location:'Бишкек, Кыргызстан', follow:'Бизге кошулуңуз', added:'Себетке кошулду', required:'Керектүү талааларды толтуруңуз.', thanks:'Рахмат! Пикир демо сактагычка сакталды.' }
}

const categoryNames: Record<Lang, Record<string,string>> = {
  UZ:{All:'Barchasi',Burgers:'Burgerlar',Sides:'Gazaklar',Chicken:'Tovuq',Pizza:'Pitsa',Drinks:'Ichimliklar'},
  RU:{All:'Все',Burgers:'Бургеры',Sides:'Закуски',Chicken:'Курица',Pizza:'Пицца',Drinks:'Напитки'},
  KG:{All:'Баары',Burgers:'Бургерлер',Sides:'Закускалар',Chicken:'Тоок',Pizza:'Пицца',Drinks:'Суусундуктар'}
}

function pname(p: Product, lang: Lang){ return lang === 'RU' ? p.ru : lang === 'KG' ? p.kg : p.name }
function pdesc(p: Product, lang: Lang){ return lang === 'RU' ? p.ruDesc : lang === 'KG' ? p.kgDesc : p.desc }
function useStored<T>(key:string, initial:T){
  const [value,setValue] = useState<T>(()=>{ try { const v=localStorage.getItem(key); return v ? JSON.parse(v) : initial } catch { return initial } })
  useEffect(()=>localStorage.setItem(key,JSON.stringify(value)),[key,value])
  return [value,setValue] as const
}

function Brand(){
  return <div className="brand"><span className="brandMark">I</span><span>I BURGER</span></div>
}

function Storefront(){
  const [lang,setLang] = useStored<Lang>('ib-lang','UZ')
  const [products] = useStored<Product[]>('ib-products',seedProducts)
  const [cart,setCart] = useStored<Record<number,number>>('ib-cart',{})
  const [category,setCategory] = useState('All')
  const [search,setSearch] = useState('')
  const [sort,setSort] = useState('popular')
  const [cartOpen,setCartOpen] = useState(false)
  const [mobile,setMobile] = useState(false)
  const [detail,setDetail] = useState<Product|null>(null)
  const [toast,setToast] = useState('')
  const [favorites,setFavorites] = useStored<number[]>('ib-favorites',[])
  const [form,setForm] = useState({name:'',phone:'',address:'',notes:''})
  const [reviews,setReviews] = useStored<any[]>('ib-reviews',[
    {name:'Aziza',rating:5,text:'Burger juda mazali, issiq va tez yetib keldi!'},
    {name:'Алексей',rating:5,text:'Отличное мясо и действительно хрустящая картошка.'},
    {name:'Айпери',rating:5,text:'Бишкектеги эң даамдуу бургерлердин бири!'}
  ])
  const [review,setReview] = useState({name:'',text:'',rating:5})
  const t = copy[lang]
  const cartItems = products.filter(p=>cart[p.id]).map(p=>({...p,qty:cart[p.id]}))
  const total = cartItems.reduce((sum,p)=>sum+p.price*p.qty,0)
  const count = Object.values(cart).reduce((a,b)=>a+b,0)
  const visible = useMemo(()=>products.filter(p=>p.available!==false && (category==='All'||p.category===category) && pname(p,lang).toLowerCase().includes(search.toLowerCase())).sort((a,b)=>sort==='low'?a.price-b.price:sort==='high'?b.price-a.price:Number(b.popular)-Number(a.popular)),[products,category,search,sort,lang])
  const notify=(s:string)=>{setToast(s);setTimeout(()=>setToast(''),2200)}
  const add=(id:number)=>{setCart({...cart,[id]:(cart[id]||0)+1});notify(t.added)}
  const change=(id:number,n:number)=>{const next={...cart}; if(n<=0) delete next[id]; else next[id]=n; setCart(next)}
  const openWhatsApp=()=>{
    if(!cartItems.length){setCartOpen(true);return}
    if(!form.name||!form.phone||!form.address){notify(t.required);return}
    const lines=cartItems.map((p,i)=>`${i+1}. ${pname(p,lang)} x${p.qty} — ${p.price*p.qty} som`).join('\n')
    const msg=`Salom! Men buyurtma bermoqchiman.\n\nBuyurtmam:\n${lines}\n\nJami: ${total} som.\n\nIsm: ${form.name}\nTelefon: ${form.phone}\nManzil: ${form.address}${form.notes?`\nIzoh: ${form.notes}`:''}\n\nIltimos, buyurtmamni qabul qiling.`
    window.open(`https://wa.me/996221585504?text=${encodeURIComponent(msg)}`,'_blank')
  }
  const addReview=(e:FormEvent)=>{e.preventDefault();if(!review.name||!review.text)return notify(t.required);setReviews([{...review},...reviews]);setReview({name:'',text:'',rating:5});notify(t.thanks)}

  return <div className="app">
    <header className="header">
      <a className="brandLink" href="#home"><Brand/></a>
      <nav className={mobile?'nav open':'nav'}>
        {[['home',t.home],['menu',t.menu],['popular',t.popular],['about',t.about],['contact',t.contact]].map(x=><a key={x[0]} href={`#${x[0]}`} onClick={()=>setMobile(false)}>{x[1]}</a>)}
      </nav>
      <div className="headerActions">
        <select aria-label="Language" value={lang} onChange={e=>setLang(e.target.value as Lang)}>{(['KG','RU','UZ'] as Lang[]).map(x=><option key={x}>{x}</option>)}</select>
        <button className="iconBtn cartButton" aria-label={t.cart} onClick={()=>setCartOpen(true)}><ShoppingBag size={20}/>{count>0&&<b>{count}</b>}</button>
        <button className="primary desktopOrder" onClick={()=>{setCartOpen(true)}}>{t.order}</button>
        <button className="iconBtn mobileMenu" aria-label="Menu" onClick={()=>setMobile(!mobile)}>{mobile?<X/>:<Menu/>}</button>
      </div>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="heroGlow"/>
        <div className="heroCopy">
          <span className="eyebrow"><span/> BISHKEK’S BURGER HOUSE</span>
          <h1>{t.headline}</h1>
          <p>{t.sub}</p>
          <div className="heroButtons"><a className="primary big" href="#menu">{t.explore}</a><button className="secondary big" onClick={()=>setCartOpen(true)}>{t.whatsapp}</button></div>
          <div className="badges"><span><Check/> {t.fresh}</span><span><Check/> {t.delicious}</span><span><Check/> {t.fast}</span></div>
        </div>
        <div className="heroVisual">
          <div className="orangeDisc"/>
          <img src={photos.burger} alt="Double cheeseburger with fresh salad"/>
          <div className="ratingFloat"><b>4.9</b><span><Star fill="currentColor" size={14}/> 2.4k reviews</span></div>
        </div>
      </section>

      <section className="menuSection" id="menu">
        <div className="sectionHead"><div><span className="eyebrow">OUR MENU</span><h2>{t.menuTitle}</h2><p>{t.menuSub}</p></div><div className="resultCount">{visible.length} items</div></div>
        <div className="menuTools">
          <div className="categories">{['All','Burgers','Sides','Chicken','Pizza','Drinks'].map(c=><button className={category===c?'active':''} onClick={()=>setCategory(c)} key={c}>{categoryNames[lang][c]}</button>)}</div>
          <div className="searchSort"><label><Search size={18}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t.search}/></label><label><ChevronDown size={16}/><select value={sort} onChange={e=>setSort(e.target.value)}><option value="popular">{t.popular}</option><option value="low">{t.priceLow}</option><option value="high">{t.priceHigh}</option></select></label></div>
        </div>
        <div className="productGrid">
          {visible.map(p=><article className="productCard" key={p.id} id={p.popular?'popular':undefined}>
            <div className="productImage"><img src={p.image} alt={pname(p,lang)}/><span>{categoryNames[lang][p.category]}</span><button className={favorites.includes(p.id)?'fav active':'fav'} aria-label="Favorite" onClick={()=>setFavorites(favorites.includes(p.id)?favorites.filter(x=>x!==p.id):[...favorites,p.id])}><Heart size={19} fill="currentColor"/></button></div>
            <div className="productBody"><h3>{pname(p,lang)}</h3><p>{pdesc(p,lang)}</p><button className="detailLink" onClick={()=>setDetail(p)}>{t.details} →</button><div className="productBottom"><strong>{p.price} <small>сом</small></strong>{cart[p.id]?<div className="stepper"><button onClick={()=>change(p.id,cart[p.id]-1)}><Minus/></button><b>{cart[p.id]}</b><button onClick={()=>change(p.id,cart[p.id]+1)}><Plus/></button></div>:<button className="addBtn" onClick={()=>add(p.id)}><Plus/> {t.add}</button>}</div></div>
          </article>)}
        </div>
      </section>

      <section className="about" id="about">
        <div className="aboutImage"><img src={photos.burger3} alt="Our fresh signature burger"/><span><b>100%</b> FRESH</span></div>
        <div className="aboutCopy"><span className="eyebrow">THE I BURGER WAY</span><h2>{t.promise}</h2><p>{t.aboutText}</p><div className="qualityGrid"><div><b>01</b><span>Premium beef</span></div><div><b>02</b><span>Fresh daily</span></div><div><b>03</b><span>Made to order</span></div></div></div>
      </section>

      <section className="reviews" id="reviews">
        <div className="sectionHead"><div><span className="eyebrow">REVIEWS</span><h2>{t.reviews}</h2><p>{t.reviewSub}</p></div></div>
        <div className="reviewLayout"><div className="reviewGrid">{reviews.slice(0,3).map((r,i)=><article className="reviewCard" key={i}><div className="stars">{Array.from({length:r.rating}).map((_,x)=><Star key={x} size={16} fill="currentColor"/>)}</div><p>“{r.text}”</p><strong>{r.name}</strong></article>)}</div><form className="reviewForm" onSubmit={addReview}><div className="ratingPicker">{[1,2,3,4,5].map(n=><button type="button" key={n} onClick={()=>setReview({...review,rating:n})}><Star fill={n<=review.rating?'currentColor':'none'}/></button>)}</div><input value={review.name} onChange={e=>setReview({...review,name:e.target.value})} placeholder={t.reviewName}/><textarea value={review.text} onChange={e=>setReview({...review,text:e.target.value})} placeholder={t.reviewText}/><button className="primary">{t.submit}</button><small>Prototype: reviews are stored only in this browser.</small></form></div>
      </section>
    </main>

    <footer id="contact"><div className="footerTop"><div><Brand/><p>{t.promise}</p></div><div><b>{t.contact}</b><a href="tel:+996221585504"><Phone/> +996 221 585 504</a><span>{t.location}</span></div><div><b>{t.hours}</b><span><Clock3/> {t.everyDay}: 10:00 — 23:00</span></div><div><b>{t.follow}</b><span className="socials"><a href="https://instagram.com" target="_blank" aria-label="Instagram"><Heart/></a><a href="https://wa.me/996221585504" target="_blank" aria-label="WhatsApp"><Phone/></a></span></div></div><div className="footerBottom"><span>© 2026 I BURGER. All rights reserved.</span><select value={lang} onChange={e=>setLang(e.target.value as Lang)}><option value="KG">Кыргызча</option><option value="RU">Русский</option><option value="UZ">O‘zbekcha</option></select></div></footer>

    {cartOpen&&<><div className="overlay" onClick={()=>setCartOpen(false)}/><aside className="cartDrawer"><div className="drawerHead"><div><span>ORDER</span><h2>{t.cart}</h2></div><button className="iconBtn" onClick={()=>setCartOpen(false)}><X/></button></div>{!cartItems.length?<div className="empty"><ShoppingBag/><h3>{t.empty}</h3><button className="primary" onClick={()=>setCartOpen(false)}>{t.explore}</button></div>:<><div className="cartItems">{cartItems.map(p=><div className="cartItem" key={p.id}><img src={p.image}/><div><b>{pname(p,lang)}</b><span>{p.price} сом</span><div className="stepper"><button onClick={()=>change(p.id,p.qty-1)}><Minus/></button><b>{p.qty}</b><button onClick={()=>change(p.id,p.qty+1)}><Plus/></button></div></div><button className="remove" onClick={()=>change(p.id,0)}><Trash2/></button></div>)}</div><div className="cartTotal"><button onClick={()=>setCart({})}>{t.clear}</button><span>{t.subtotal} <b>{total} сом</b></span></div><div className="checkout"><h3>{t.checkout}</h3><input placeholder={t.name} value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/><input placeholder={t.phone} type="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/><input placeholder={t.address} value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/><textarea placeholder={t.notes} value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/><button className="whatsappBtn" onClick={openWhatsApp}><Phone/> {t.send}</button><small>You will review and send the message yourself in WhatsApp.</small></div></>}</aside></>}
    {detail&&<div className="modalWrap"><div className="overlay" onClick={()=>setDetail(null)}/><div className="modal"><img src={detail.image}/><div><button className="modalClose" onClick={()=>setDetail(null)}><X/></button><span className="eyebrow">{categoryNames[lang][detail.category]}</span><h2>{pname(detail,lang)}</h2><p>{pdesc(detail,lang)}</p><div className="modalPrice">{detail.price} сом</div><button className="primary" onClick={()=>{add(detail.id);setDetail(null)}}><Plus/> {t.add}</button></div></div></div>}
    {toast&&<div className="toast"><Check/> {toast}</div>}
  </div>
}

function Admin(){
  const navigate=useNavigate()
  const [logged,setLogged]=useStored('ib-admin-auth',false)
  const [products,setProducts]=useStored<Product[]>('ib-products',seedProducts)
  const [reviews,setReviews]=useStored<any[]>('ib-reviews',[])
  const [editing,setEditing]=useState<Product|null>(null)
  const [query,setQuery]=useState('')
  const [filter,setFilter]=useState('All')
  const [toast,setToast]=useState('')
  const flash=(s:string)=>{setToast(s);setTimeout(()=>setToast(''),2000)}
  if(!logged) return <div className="adminLogin"><div className="loginCard"><Brand/><span className="adminPill">ADMIN PORTAL</span><h1>Welcome back</h1><p>Sign in to manage the local I BURGER prototype.</p><form onSubmit={e=>{e.preventDefault();setLogged(true)}}><label>Email<input type="email" defaultValue="admin@iburger.kg" required/></label><label>Password<input type="password" defaultValue="demo123" required/></label><button className="primary">Sign in</button></form><small>Demo only — localStorage authentication is not secure. Production requires server-side authentication and authorization.</small><button className="backLink" onClick={()=>navigate('/')}><ArrowLeft/> Return to website</button></div></div>
  const visible=products.filter(p=>(filter==='All'||p.category===filter)&&p.name.toLowerCase().includes(query.toLowerCase()))
  const save=(e:FormEvent<HTMLFormElement>)=>{e.preventDefault();const f=new FormData(e.currentTarget);const next={...editing,name:String(f.get('name')),ru:String(f.get('ru')),kg:String(f.get('kg')),price:Number(f.get('price')),category:String(f.get('category')) as Category,desc:String(f.get('desc')),ruDesc:String(f.get('desc')),kgDesc:String(f.get('desc')),image:String(f.get('image')),available:f.get('available')==='on'} as Product;if(editing?.id)setProducts(products.map(p=>p.id===editing.id?next:p));else setProducts([...products,{...next,id:Date.now()}]);setEditing(null);flash('Product saved')}
  const blank={id:0,name:'',ru:'',kg:'',desc:'',ruDesc:'',kgDesc:'',price:0,category:'Burgers' as Category,image:photos.burger,available:true}
  return <div className="adminShell">
    <aside className="adminSide"><Brand/><nav><button className="active">Overview</button><button>Products</button><button>Inquiries</button><button>Reviews</button></nav><div><button onClick={()=>navigate('/')}><ArrowLeft/> Storefront</button><button onClick={()=>setLogged(false)}>Sign out</button></div></aside>
    <main className="adminMain"><header><div><span>ADMIN / OVERVIEW</span><h1>Good day, Admin</h1></div><button className="primary" onClick={()=>setEditing(blank)}><Plus/> Add product</button></header>
      <div className="demoNotice"><b>Prototype workspace</b><span>Data is stored in this browser only. WhatsApp orders are not saved as orders.</span></div>
      <section className="stats"><article><span>Total products</span><b>{products.length}</b><small>Live catalog</small></article><article><span>Order inquiries</span><b>0</b><small>No backend connected</small></article><article><span>Customer reviews</span><b>{reviews.length}</b><small>Local demo entries</small></article><article><span>Availability</span><b>{products.filter(p=>p.available).length}</b><small>Items currently active</small></article></section>
      <section className="adminPanel"><div className="panelHead"><div><h2>Products</h2><p>Manage menu items and availability.</p></div><div className="adminFilters"><label><Search/><input placeholder="Search products" value={query} onChange={e=>setQuery(e.target.value)}/></label><select value={filter} onChange={e=>setFilter(e.target.value)}><option>All</option>{['Burgers','Sides','Chicken','Pizza','Drinks'].map(x=><option key={x}>{x}</option>)}</select></div></div><div className="tableWrap"><table><thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Status</th><th/></tr></thead><tbody>{visible.map(p=><tr key={p.id}><td><img src={p.image}/><b>{p.name}</b></td><td>{p.category}</td><td>{p.price} сом</td><td><span className={p.available?'status live':'status'}>{p.available?'Available':'Hidden'}</span></td><td><button onClick={()=>setEditing(p)}><Pencil/></button><button onClick={()=>{if(confirm('Delete this product?')){setProducts(products.filter(x=>x.id!==p.id));flash('Product deleted')}}}><Trash2/></button></td></tr>)}</tbody></table></div></section>
      <section className="adminPanel"><div className="panelHead"><div><h2>Customer reviews</h2><p>Browser-local prototype reviews.</p></div></div>{reviews.length?reviews.map((r,i)=><div className="adminReview" key={i}><div><b>{r.name}</b><span>{r.rating} / 5</span><p>{r.text}</p></div><button onClick={()=>setReviews(reviews.filter((_,x)=>x!==i))}><Trash2/></button></div>):<div className="adminEmpty">No local reviews yet.</div>}</section>
    </main>
    {editing&&<div className="modalWrap"><div className="overlay" onClick={()=>setEditing(null)}/><form className="editModal" onSubmit={save}><div className="drawerHead"><div><span>CATALOG</span><h2>{editing.id?'Edit product':'Add product'}</h2></div><button type="button" className="iconBtn" onClick={()=>setEditing(null)}><X/></button></div><div className="formGrid"><label>Name (UZ/EN)<input name="name" defaultValue={editing.name} required/></label><label>Name (RU)<input name="ru" defaultValue={editing.ru} required/></label><label>Name (KG)<input name="kg" defaultValue={editing.kg} required/></label><label>Price (сом)<input name="price" type="number" defaultValue={editing.price} required/></label><label>Category<select name="category" defaultValue={editing.category}>{['Burgers','Sides','Chicken','Pizza','Drinks'].map(x=><option key={x}>{x}</option>)}</select></label><label className="wide">Description<textarea name="desc" defaultValue={editing.desc} required/></label><label className="wide">Image URL<input name="image" defaultValue={editing.image} required/></label><label className="check"><input name="available" type="checkbox" defaultChecked={editing.available}/> Available in storefront</label></div><button className="primary">Save product</button></form></div>}
    {toast&&<div className="toast"><Check/> {toast}</div>}
  </div>
}

const router=createBrowserRouter([{path:'/',Component:Storefront},{path:'/admin',Component:Admin}])
export default function App(){return <RouterProvider router={router}/>}
