# Mit főzzek? 🍳🥘

Magyar nyelvű, mobilra optimalizált receptkereső és konyhai asszisztens webapp.

A felhasználó bepipálja, mi van otthon a hűtőben és kamrában, megjelöli a lejáró/romlandó alapanyagokat, és egyetlen gombnyomásra valós, autentikus magyar receptet kap a lejáró alapanyagok prioritásos felhasználásával.

---

## Fő Jellemzők

### 1. Képernyő: „Mi van otthon?”
- **Krém háttér & terrakotta gombok**: Meleg, konyhai hangulatú színvilág.
- **Valós fotós csempék**: Minden alapanyag világos hátterű, minőségi fotóval, magyar névvel és kerek pipával jelenik meg.
- **Romlandó („holnap”) szalag**: A romlandónak jelölt alapanyagok piros szalagot kapnak és azonnal a lista legtetejére rendeződnek.
- **„Írd be” kereső & hozzáadás**: Új alapanyagok felvétele fotó-hozzárendeléssel.
- **Alapszekrény (Pantry) kapcsoló**: Alapértelmezésben bekapcsolva (`olaj, só, bors, cukor, liszt, ecet, víz` automatikusan elérhetőnek számít).
- **Fix alsó „MIT FŐZZEK?” gomb**: Élő darabszámlálóval.

### 2. Képernyő: „Találat”
- **Nagy készétel-fotó**: Az elkészült fogás fotója.
- **Illeszkedési magyarázat**: Pl. *„Felhasználja a csirkét és a tejfölt. Hiányzik: kapor.”*
- **Hiányzó alapanyag kártyák**:
  - „Megveszem” gomb (egy kattintással pipálható).
  - „Helyettesítem” ellenőrzött cserékkel:
    - *tejföl $\rightarrow$ görög joghurt*
    - *kapor $\rightarrow$ petrezselyem*
    - *csirkemell $\rightarrow$ pulykamell*
    *(A csere azonnal átírja a hozzávalók mennyiségét és a lépésszöveget is!)*
- **Adagválasztó (1–100 fő, alapértelmezés: 4 fő)**:
  - Mindig kiírja: *„X főre.”*
  - Lineáris mértékegységek (`g`, `dkg`, `dl`, `db`, `csokor`, `ek`, `tk`).
  - **Fűszerszabály**: Só, bors, pirospaprika 8 adag felett automatikusan *„kóstolásra”* vált, hogy ne sózza/paprikázza el a fogást.
- **„Másikat kérek”**: Következő recept jelölt azonos romlandókkal.

### 3. Képernyő: „Főzési mód” (Konyhai asszisztens)
- **Egy lépés egyszerre**: Nagy méretű, a konkrét mozdulatra fókuszáló fotókkal (hagyma dinsztelés, habarás, gombócolás, tálalás).
- **Nagy betűs lépésszöveg**: Messziről, a konyhapultról is kényelmesen olvasható.
- **Interaktív Időzítő (Timer)**: Perces lépéseknél indítható visszaszámláló és hangjelzés.
- **Képernyő ébrentartás (Screen WakeLock API)**: Meggátolja a kijelző lekapcsolódását főzés közben.
- **3/7 lépésszámláló** és sikeres befejezés konfetti animációval.

---

## 6 Autentikus Magyar Recept
1. **Paprikás csirke nokedlivel**
2. **Tejfölös raguleves**
3. **Királyi magyar rántotta**
4. **Pirított kolbászos tészta**
5. **Fűszeres ropogós tepsis krumpli**
6. **Paradicsomos húsgombóc**

---

## Telepítés és Helyi Futtatás

```bash
# Függőségek telepítése
npm install

# Fejlesztői szerver indítása
npm run dev

# Termelési build készítése
npm run build

# Termelési előnézet indítása
npm run preview
```

---

## Feltöltés GitHubra és Futtatás Renderen

### 1. Feltöltés GitHubra

```bash
cd /home/zsiraf/.gemini/antigravity/scratch/mit-fozzek
git init
git add .
git commit -m "Initial commit: Mit főzzek mobil webapp"

# Hozz létre egy új publikus vagy privát repót a GitHubon (pl. mit-fozzek), majd:
git remote add origin https://github.com/<FELHASZNÁLÓNÉV>/mit-fozzek.git
git branch -M main
git push -u origin main
```

*(Vagy ha be vagy jelentkezve a GitHub CLI-vel: `gh repo create mit-fozzek --public --source=. --push`)*

### 2. Futtatás a Render.com-on

1. Lépj be a [dashboard.render.com](https://dashboard.render.com) oldalra.
2. Kattints a **New +** $\rightarrow$ **Static Site** (vagy **Blueprint**) gombra.
3. Válaszd ki a GitHub repositorydat (`mit-fozzek`).
4. A beállítások automatikusan érvényesülnek a mellékelt `render.yaml` fájlból:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
5. Kattints a **Create Static Site** gombra!
6. A Render pár másodperc alatt lefordítja és közzéteszi az alkalmazást egy ingyenes HTTPS linken (pl. `https://mit-fozzek.onrender.com`).
