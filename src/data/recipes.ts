import { Recipe } from '../types';

export const RECIPES: Recipe[] = [
  {
    id: 'paprikas-csirke',
    title: 'Paprikás csirke nokedlivel',
    tagline: 'Klasszikus selymes, szaftos paprikás csirke friss házi galuskával',
    coverImage: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1200&q=80',
    prepTimeMinutes: 45,
    baseServings: 4,
    ingredients: [
      { ingredientId: 'csirkecomb', name: 'csirkecomb vagy csirkemell', baseAmount: 800, unit: 'g' },
      { ingredientId: 'voroshagyma', name: 'vöröshagyma', baseAmount: 2, unit: 'db' },
      { ingredientId: 'fokhagyma', name: 'fokhagyma', baseAmount: 3, unit: 'db' },
      { ingredientId: 'paprika', name: 'TV paprika', baseAmount: 1, unit: 'db' },
      { ingredientId: 'paradicsom', name: 'paradicsom', baseAmount: 1, unit: 'db' },
      { ingredientId: 'pirospaprika', name: 'nemes édes pirospaprika', baseAmount: 2, unit: 'ek', isSpiceOrSeasoning: true },
      { ingredientId: 'tejfol', name: 'tejföl', baseAmount: 2, unit: 'dl' },
      { ingredientId: 'liszt', name: 'liszt (habaráshoz és nokedlihez)', baseAmount: 300, unit: 'g' },
      { ingredientId: 'tojas', name: 'tojás (a nokedlihez)', baseAmount: 2, unit: 'db' },
      { ingredientId: 'olaj', name: 'olaj vagy sertészsír', baseAmount: 3, unit: 'ek' },
      { ingredientId: 'so', name: 'só', baseAmount: 1.5, unit: 'tk', isSpiceOrSeasoning: true },
      { ingredientId: 'bors', name: 'őrölt fekete bors', baseAmount: 0.5, unit: 'tk', isSpiceOrSeasoning: true },
      { ingredientId: 'viz', name: 'víz', baseAmount: 4, unit: 'dl' }
    ],
    availableSubstitutions: {
      tejfol: {
        targetId: 'tejfol',
        substituteId: 'gorog_joghurt',
        substituteName: 'Görög joghurt',
        substituteUnit: 'dl',
        amountMultiplier: 1,
        stepReplacements: {
          'tejföllel': 'görög joghurttal',
          'tejfölös': 'görög joghurtos',
          'tejfölt': 'görög joghurtot',
          'tejföl': 'görög joghurt'
        }
      },
      csirkemell: {
        targetId: 'csirkemell',
        substituteId: 'pulykamell',
        substituteName: 'Pulykamell',
        substituteUnit: 'g',
        amountMultiplier: 1,
        stepReplacements: {
          'csirkehúst': 'pulykahúst',
          'csirkemellet': 'pulykamellet',
          'csirkecombot': 'pulykahúst',
          'csirke': 'pulyka'
        }
      }
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Alap előkészítése',
        instruction: 'A vöröshagymát vágd finom apróra. Egy lábasban melegítsd fel a zsiradékot, és pirítsd a hagymát üvegesre, aranybarnára.',
        imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
        timerSeconds: 360,
        timerLabel: 'Hagyma dinsztelése (6 perc)'
      },
      {
        stepNumber: 2,
        title: 'Paprikás pörköltalap',
        instruction: 'Húzd le a lábast a tűzről, szórd rá a pirospaprikát, keverd el gyorsan, majd dobd rá a feldarabolt csirkehúst, az aprított fokhagymát, a kockázott paradicsomot és paprikát. Ízesítsd sóval, borssal.',
        imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80'
      },
      {
        stepNumber: 3,
        title: 'Párolás',
        instruction: 'Önts alá 2-3 dl vizet, fedd le, és közepes lángon főzd puhára a húst kb. 25-30 perc alatt.',
        imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
        timerSeconds: 1500,
        timerLabel: 'Hús párolása (25 perc)'
      },
      {
        stepNumber: 4,
        title: 'Nokedli szaggatás',
        instruction: 'Egy tálban keverd össze a lisztet a tojásokkal, kevés sóval és kb. 1,5 dl vízzel sűrű, galuskatésztává. Forrásban lévő sós vízbe szaggasd ki nokedliszaggatóval, és mikor feljött a víz tetejére, szűrd le.',
        imageUrl: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=800&q=80',
        timerSeconds: 300,
        timerLabel: 'Nokedli főzés (5 perc)'
      },
      {
        stepNumber: 5,
        title: 'Habarás és selymesítés',
        instruction: 'A tejfölt keverd simára 1 evőkanál liszttel és merj hozzá egy kevés forró szaftot (hőkiegyenlítés). Öntsd vissza a csirkéhez, forrald össze 2-3 perc alatt, amíg selymesen besűrűsödik.',
        imageUrl: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=800&q=80',
        timerSeconds: 180,
        timerLabel: 'Összeforralás (3 perc)'
      },
      {
        stepNumber: 6,
        title: 'Tálalás',
        instruction: 'Tálald a forró nokedlivel, bőséges szafttal lelocsolva, ízlés szerint extra tejföllel a tetején!',
        imageUrl: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'tejfeles-raguleves',
    title: 'Tejfölös raguleves',
    tagline: 'Laktató, selymes zöldséges raguleves omlós csirkemellel és kaporral',
    coverImage: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80',
    prepTimeMinutes: 35,
    baseServings: 4,
    ingredients: [
      { ingredientId: 'csirkemell', name: 'csirkemellfilé', baseAmount: 500, unit: 'g' },
      { ingredientId: 'krumpli', name: 'krumpli (kockázva)', baseAmount: 300, unit: 'g' },
      { ingredientId: 'voroshagyma', name: 'vöröshagyma', baseAmount: 1, unit: 'db' },
      { ingredientId: 'fokhagyma', name: 'fokhagyma', baseAmount: 2, unit: 'db' },
      { ingredientId: 'tejfol', name: 'tejföl', baseAmount: 2, unit: 'dl' },
      { ingredientId: 'kapor', name: 'friss kapor', baseAmount: 1, unit: 'csokor' },
      { ingredientId: 'liszt', name: 'liszt', baseAmount: 1.5, unit: 'ek' },
      { ingredientId: 'olaj', name: 'olaj vagy vaj', baseAmount: 2, unit: 'ek' },
      { ingredientId: 'so', name: 'só', baseAmount: 1.5, unit: 'tk', isSpiceOrSeasoning: true },
      { ingredientId: 'bors', name: 'őrölt bors', baseAmount: 0.5, unit: 'tk', isSpiceOrSeasoning: true },
      { ingredientId: 'ecet', name: 'ecet vagy citromlé', baseAmount: 1, unit: 'tk' },
      { ingredientId: 'viz', name: 'víz vagy alaplé', baseAmount: 1.2, unit: 'dl' } // 1.2 liter represented in dl (12 dl)
    ],
    availableSubstitutions: {
      kapor: {
        targetId: 'kapor',
        substituteId: 'petrezselyem',
        substituteName: 'Petrezselyem',
        substituteUnit: 'csokor',
        amountMultiplier: 1,
        stepReplacements: {
          'kaporral': 'petrezselyemmel',
          'kaprot': 'petrezselymet',
          'kapor': 'petrezselyem'
        }
      },
      tejfol: {
        targetId: 'tejfol',
        substituteId: 'gorog_joghurt',
        substituteName: 'Görög joghurt',
        substituteUnit: 'dl',
        amountMultiplier: 1,
        stepReplacements: {
          'tejföllel': 'görög joghurttal',
          'tejfölös': 'görög joghurtos',
          'tejfölt': 'görög joghurtot',
          'tejföl': 'görög joghurt'
        }
      },
      csirkemell: {
        targetId: 'csirkemell',
        substituteId: 'pulykamell',
        substituteName: 'Pulykamell',
        substituteUnit: 'g',
        amountMultiplier: 1,
        stepReplacements: {
          'csirkemellet': 'pulykamellet',
          'csirkemell': 'pulykamell'
        }
      }
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Hús és hagyma pirítása',
        instruction: 'A finomra vágott vöröshagymát pirítsd üvegesre a zsiradékon, majd add hozzá a falatnyi kockákra vágott csirkemellet és a zúzott fokhagymát. Fehéredésig pirítsd.',
        imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=800&q=80',
        timerSeconds: 300,
        timerLabel: 'Hús pirítása (5 perc)'
      },
      {
        stepNumber: 2,
        title: 'Zöldség és főzés',
        instruction: 'Add hozzá a felkockázott krumplit, sózd, borsozd, majd öntsd fel 1,2 liter vízzel. Közepes lángon főzd 15-20 percig, míg a krumpli megpuhul.',
        imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
        timerSeconds: 1080,
        timerLabel: 'Főzés (18 perc)'
      },
      {
        stepNumber: 3,
        title: 'Tejfölös habarás és ízesítés',
        instruction: 'A tejfölt keverd csomómentesre a liszttel és egy merőkanál meleg levessel, majd csurgasd a forrásban lévő leveshez. Szórd bele a friss vágott kaprot, és cseppents bele egy kevés ecetet.',
        imageUrl: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80',
        timerSeconds: 180,
        timerLabel: 'Összeforralás (3 perc)'
      },
      {
        stepNumber: 4,
        title: 'Tálalás',
        instruction: 'Forrón tálald mélytányérban, friss kaporlevéllel díszítve.',
        imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'rantotta',
    title: 'Királyi magyar rántotta',
    tagline: 'Krémes, szaftos házi rántotta friss tojásból petrezselyemmel és opcionális kolbásszal',
    coverImage: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80',
    prepTimeMinutes: 10,
    baseServings: 4,
    ingredients: [
      { ingredientId: 'tojas', name: 'friss tojás', baseAmount: 8, unit: 'db' },
      { ingredientId: 'vaj', name: 'vaj vagy étolaj', baseAmount: 30, unit: 'g' },
      { ingredientId: 'petrezselyem', name: 'friss petrezselyem', baseAmount: 0.5, unit: 'csokor' },
      { ingredientId: 'so', name: 'só', baseAmount: 1, unit: 'tk', isSpiceOrSeasoning: true },
      { ingredientId: 'bors', name: 'frissen őrölt bors', baseAmount: 0.5, unit: 'tk', isSpiceOrSeasoning: true },
      { ingredientId: 'kolbasz', name: 'kolbászkarika (opcionális)', baseAmount: 80, unit: 'g', optional: true },
      { ingredientId: 'sajt', name: 'reszelt sajt a tetejére (opcionális)', baseAmount: 60, unit: 'g', optional: true }
    ],
    availableSubstitutions: {
      petrezselyem: {
        targetId: 'petrezselyem',
        substituteId: 'kapor',
        substituteName: 'Kapor',
        substituteUnit: 'csokor',
        amountMultiplier: 1,
        stepReplacements: {
          'petrezselyemmel': 'kaporral',
          'petrezselymet': 'kaprot',
          'petrezselyem': 'kapor'
        }
      }
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Tojások felverése',
        instruction: 'Üsd a tojásokat egy mély tálba, adj hozzá sót, borsot és a finomra aprított petrezselymet. Villával laza, egynemű mozdulatokkal verd fel (ne habosítsd túl).',
        imageUrl: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=800&q=80'
      },
      {
        stepNumber: 2,
        title: 'Sütés serpenyőben',
        instruction: 'Egy serpenyőben olvaszd fel a vajat (ha használsz kolbászt, először pirítsd meg a karikákat 1 percig). Öntsd bele a felvert tojásokat.',
        imageUrl: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80'
      },
      {
        stepNumber: 3,
        title: 'Krémesre húzás',
        instruction: 'Közepesen alacsony lángon, spatulával kívülről befelé húzgálva süsd kb. 2-3 percig, hogy szaftos és krémes maradjon. Ne szárítsd ki!',
        imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
        timerSeconds: 150,
        timerLabel: 'Krémesre sütés (2.5 perc)'
      },
      {
        stepNumber: 4,
        title: 'Tálalás',
        instruction: 'Azonnal csúsztasd meleg tányérra, szórd meg reszelt sajttal vagy még egy kevés friss zöldfűszerrel, és tálald!',
        imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'teszta-kolbasszal',
    title: 'Pirított kolbászos tészta',
    tagline: 'Gyors, füstös-sajtos serpenyős tészta ropogós kolbásszal és paprikával',
    coverImage: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=1200&q=80',
    prepTimeMinutes: 20,
    baseServings: 4,
    ingredients: [
      { ingredientId: 'teszta', name: 'száraztészta (fodros kocka, penne vagy orsó)', baseAmount: 400, unit: 'g' },
      { ingredientId: 'kolbasz', name: 'füstölt kolbász', baseAmount: 200, unit: 'g' },
      { ingredientId: 'voroshagyma', name: 'vöröshagyma', baseAmount: 1, unit: 'db' },
      { ingredientId: 'fokhagyma', name: 'fokhagyma', baseAmount: 2, unit: 'db' },
      { ingredientId: 'pirospaprika', name: 'pirospaprika', baseAmount: 1, unit: 'ek', isSpiceOrSeasoning: true },
      { ingredientId: 'sajt', name: 'reszelt sajt', baseAmount: 100, unit: 'g' },
      { ingredientId: 'olaj', name: 'olaj', baseAmount: 1, unit: 'ek' },
      { ingredientId: 'so', name: 'só', baseAmount: 1, unit: 'tk', isSpiceOrSeasoning: true },
      { ingredientId: 'bors', name: 'bors', baseAmount: 0.5, unit: 'tk', isSpiceOrSeasoning: true }
    ],
    availableSubstitutions: {},
    steps: [
      {
        stepNumber: 1,
        title: 'Tészta kifőzése',
        instruction: 'Bő, forrásban lévő sós vízben főzd ki a tésztát al dente állagúra a csomagolás szerinti idő alatt, majd szűrd le (egy fél merőkanál főzővizet tegyél félre).',
        imageUrl: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=800&q=80',
        timerSeconds: 480,
        timerLabel: 'Tésztafőzés (8 perc)'
      },
      {
        stepNumber: 2,
        title: 'Kolbász és hagyma pirítása',
        instruction: 'A kolbászt vékony karikákra vágd, a hagymát kockázd fel. Egy nagy serpenyőben pirítsd ki a kolbász zsírját, majd add hozzá a hagymát és a zúzott fokhagymát, és pirítsd aranybarnára.',
        imageUrl: 'https://images.unsplash.com/photo-1585325701165-351af916e581?auto=format&fit=crop&w=800&q=80',
        timerSeconds: 300,
        timerLabel: 'Pirítás (5 perc)'
      },
      {
        stepNumber: 3,
        title: 'Összeforgatás',
        instruction: 'Szórd meg egy kevés pirospaprikával, dobd rá a kifőtt tésztát, locsold meg a félretett főzővízzel, és nagy lángon pirítsd össze 2 perc alatt, hogy a szaft bevonja a tésztát.',
        imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
        timerSeconds: 120,
        timerLabel: 'Összepirítás (2 perc)'
      },
      {
        stepNumber: 4,
        title: 'Sajtozás és tálalás',
        instruction: 'Szórd meg bőségesen reszelt sajttal, forgasd át, míg ráolvad, és tálald forrón!',
        imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'sult-krumpli',
    title: 'Fűszeres ropogós tepsis krumpli',
    tagline: 'Kívül aranysárga és ropogós, belül puha fűszeres sült burgonya',
    coverImage: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1200&q=80',
    prepTimeMinutes: 30,
    baseServings: 4,
    ingredients: [
      { ingredientId: 'krumpli', name: 'burgonya', baseAmount: 1000, unit: 'g' },
      { ingredientId: 'olaj', name: 'étolaj', baseAmount: 4, unit: 'ek' },
      { ingredientId: 'fokhagyma', name: 'fokhagyma', baseAmount: 3, unit: 'db' },
      { ingredientId: 'pirospaprika', name: 'édes pirospaprika', baseAmount: 1, unit: 'ek', isSpiceOrSeasoning: true },
      { ingredientId: 'so', name: 'só', baseAmount: 1.5, unit: 'tk', isSpiceOrSeasoning: true },
      { ingredientId: 'bors', name: 'őrölt bors', baseAmount: 0.5, unit: 'tk', isSpiceOrSeasoning: true },
      { ingredientId: 'petrezselyem', name: 'friss petrezselyem a tálaláshoz', baseAmount: 0.5, unit: 'csokor', optional: true }
    ],
    availableSubstitutions: {},
    steps: [
      {
        stepNumber: 1,
        title: 'Krumpli darabolása',
        instruction: 'A meghámozott krumplit vágd egyenletes cikkekre vagy hasábokra. Mosd át hideg vízben, majd konyharuhával itasd szárazra (ez a ropogósság titka!).',
        imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80'
      },
      {
        stepNumber: 2,
        title: 'Fűszerezés',
        instruction: 'Egy nagy tálban forgasd össze a krumplit az olajjal, a zúzott fokhagymával, a pirospaprikával, a sóval és borssal.',
        imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80'
      },
      {
        stepNumber: 3,
        title: 'Sütés sütőben vagy serpenyőben',
        instruction: 'Terítsd sütőpapírral bélelt tepsire egy rétegben (ne fedjék egymást). 200°C-ra előmelegített sütőben süsd 25-30 percig, félidőben egyszer átforgatva, míg aranybarna és ropogós lesz.',
        imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80',
        timerSeconds: 1500,
        timerLabel: 'Sütés (25 perc)'
      },
      {
        stepNumber: 4,
        title: 'Tálalás',
        instruction: 'Szórd meg még forrón egy kevés sóval és aprított petrezselyemmel, és tálald azonnal!',
        imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'paradicsomos-husgomboc',
    title: 'Paradicsomos húsgombóc',
    tagline: 'Szaftos rizses húsgombócok édeskés, selymes fűszeres paradicsommártásban',
    coverImage: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=1200&q=80',
    prepTimeMinutes: 50,
    baseServings: 4,
    ingredients: [
      { ingredientId: 'csirkemell', name: 'darált hús vagy csirkemell', baseAmount: 500, unit: 'g' },
      { ingredientId: 'rizs', name: 'rizs (félkészre főzve vagy áztatva)', baseAmount: 100, unit: 'g' },
      { ingredientId: 'tojas', name: 'tojás', baseAmount: 1, unit: 'db' },
      { ingredientId: 'voroshagyma', name: 'vöröshagyma', baseAmount: 1, unit: 'db' },
      { ingredientId: 'fokhagyma', name: 'fokhagyma', baseAmount: 2, unit: 'db' },
      { ingredientId: 'paradicsom', name: 'sűrített vagy passzírozott paradicsom', baseAmount: 500, unit: 'g' },
      { ingredientId: 'cukor', name: 'cukor (az édeskés mártáshoz)', baseAmount: 2, unit: 'ek' },
      { ingredientId: 'liszt', name: 'liszt (a rántáshoz)', baseAmount: 2, unit: 'ek' },
      { ingredientId: 'olaj', name: 'olaj', baseAmount: 2, unit: 'ek' },
      { ingredientId: 'so', name: 'só', baseAmount: 1.5, unit: 'tk', isSpiceOrSeasoning: true },
      { ingredientId: 'bors', name: 'bors', baseAmount: 0.5, unit: 'tk', isSpiceOrSeasoning: true }
    ],
    availableSubstitutions: {
      csirkemell: {
        targetId: 'csirkemell',
        substituteId: 'pulykamell',
        substituteName: 'Pulykamell',
        substituteUnit: 'g',
        amountMultiplier: 1,
        stepReplacements: {
          'csirkemellet': 'pulykamellet',
          'darált csirkehúst': 'darált pulykahúst',
          'csirkehúsból': 'pulykahúsból'
        }
      }
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Húsmassza és gombócolás',
        instruction: 'A darált húst keverd össze a rizzsel, a tojással, a reszelt hagymával, a zúzott fokhagymával, sóval és borssal. Nedves kézzel formázz belőle diónál kicsit nagyobb gombócokat.',
        imageUrl: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=800&q=80'
      },
      {
        stepNumber: 2,
        title: 'Paradicsommártás alap',
        instruction: 'Az olajból és a lisztből készíts világos rántást, öntsd fel a sűrített paradicsommal és kb. 4 dl vízzel, keverd simára. Ízesítsd cukorral, sóval és forrald fel.',
        imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
        timerSeconds: 300,
        timerLabel: 'Mártás felforralása (5 perc)'
      },
      {
        stepNumber: 3,
        title: 'Gombócok kifőzése',
        instruction: 'Óvatosan helyezd a formázott húsgombócokat a gyöngyöző paradicsommártásba. Fedő alatt, csendes forrásban főzd 30-35 percig, amíg a rizs és a hús teljesen megpuhul.',
        imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
        timerSeconds: 1920,
        timerLabel: 'Gombócok főzése (32 perc)'
      },
      {
        stepNumber: 4,
        title: 'Tálalás',
        instruction: 'Tálald a forró, édeskés mártásban fürdő húsgombócokat főtt krumplival vagy friss kenyérrel!',
        imageUrl: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=80'
      }
    ]
  }
];
