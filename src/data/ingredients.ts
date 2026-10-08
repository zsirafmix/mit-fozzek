import { Ingredient } from '../types';

export const PANTRY_INGREDIENT_IDS = [
  'olaj',
  'so',
  'bors',
  'cukor',
  'liszt',
  'ecet',
  'viz'
];

export const INITIAL_INGREDIENTS: Ingredient[] = [
  {
    id: 'csirkemell',
    name: 'csirkemell',
    displayName: 'Csirkemell',
    imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=500&q=80',
    aliases: ['csirkemellfilé', 'csirke', 'hús']
  },
  {
    id: 'csirkecomb',
    name: 'csirkecomb',
    displayName: 'Csirkecomb',
    imageUrl: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=500&q=80',
    aliases: ['alsócomb', 'felsőcomb']
  },
  {
    id: 'tejfol',
    name: 'tejföl',
    displayName: 'Tejföl',
    imageUrl: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=500&q=80',
    aliases: ['tejfölös']
  },
  {
    id: 'tojas',
    name: 'tojás',
    displayName: 'Tojás',
    imageUrl: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=500&q=80',
    aliases: ['tojások']
  },
  {
    id: 'voroshagyma',
    name: 'vöröshagyma',
    displayName: 'Vöröshagyma',
    imageUrl: 'https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?auto=format&fit=crop&w=500&q=80',
    aliases: ['hagyma', 'vöröshagymák']
  },
  {
    id: 'fokhagyma',
    name: 'fokhagyma',
    displayName: 'Fokhagyma',
    imageUrl: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=500&q=80',
    aliases: ['fokhagymagerezd']
  },
  {
    id: 'petrezselyem',
    name: 'petrezselyem',
    displayName: 'Petrezselyem',
    imageUrl: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=500&q=80',
    aliases: ['petrezselyemzöld']
  },
  {
    id: 'kapor',
    name: 'kapor',
    displayName: 'Kapor',
    imageUrl: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=500&q=80',
    aliases: ['friss kapor', 'kaporzöld']
  },
  {
    id: 'pirospaprika',
    name: 'pirospaprika',
    displayName: 'Pirospaprika',
    imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=80',
    aliases: ['őrölt paprika', 'fűszerpaprika', 'édesnemes paprika']
  },
  {
    id: 'tej',
    name: 'tej',
    displayName: 'Tej',
    imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'vaj',
    name: 'vaj',
    displayName: 'Vaj',
    imageUrl: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=500&q=80',
    aliases: ['teavaj']
  },
  {
    id: 'rizs',
    name: 'rizs',
    displayName: 'Rizs',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80',
    aliases: ['fehér rizs']
  },
  {
    id: 'teszta',
    name: 'tészta',
    displayName: 'Tészta',
    imageUrl: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=500&q=80',
    aliases: ['száraztészta', 'orsótészta', 'penne', 'spagetti']
  },
  {
    id: 'krumpli',
    name: 'krumpli',
    displayName: 'Krumpli',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=500&q=80',
    aliases: ['burgonya']
  },
  {
    id: 'paradicsom',
    name: 'paradicsom',
    displayName: 'Paradicsom',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80',
    aliases: ['friss paradicsom', 'sűrített paradicsom', 'passzírozott paradicsom']
  },
  {
    id: 'paprika',
    name: 'paprika',
    displayName: 'Paprika',
    imageUrl: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=500&q=80',
    aliases: ['tv paprika', 'tölteni való paprika', 'zöldpaprika']
  },
  {
    id: 'sajt',
    name: 'sajt',
    displayName: 'Sajt',
    imageUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=500&q=80',
    aliases: ['trappista', 'reszelt sajt', 'edámi']
  },
  {
    id: 'kolbasz',
    name: 'kolbász',
    displayName: 'Kolbász',
    imageUrl: 'https://images.unsplash.com/photo-1585325701165-351af916e581?auto=format&fit=crop&w=500&q=80',
    aliases: ['füstölt kolbász', 'parasztkolbász', 'lángolt kolbász']
  }
];

export const PANTRY_INGREDIENTS: Ingredient[] = [
  {
    id: 'olaj',
    name: 'olaj',
    displayName: 'Olaj / Zsír',
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=80',
    isPantryDefault: true,
    aliases: ['napraforgóolaj', 'étolaj', 'sertészsír']
  },
  {
    id: 'so',
    name: 'só',
    displayName: 'Só',
    imageUrl: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=500&q=80',
    isPantryDefault: true
  },
  {
    id: 'bors',
    name: 'bors',
    displayName: 'Bors',
    imageUrl: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=500&q=80',
    isPantryDefault: true,
    aliases: ['őrölt fekete bors', 'fekete bors']
  },
  {
    id: 'cukor',
    name: 'cukor',
    displayName: 'Cukor',
    imageUrl: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&w=500&q=80',
    isPantryDefault: true,
    aliases: ['kristálycukor', 'porcukor']
  },
  {
    id: 'liszt',
    name: 'liszt',
    displayName: 'Liszt',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80',
    isPantryDefault: true,
    aliases: ['finomliszt', 'búzaliszt']
  },
  {
    id: 'ecet',
    name: 'ecet',
    displayName: 'Ecet',
    imageUrl: 'https://images.unsplash.com/photo-1569466896818-335b1bedfcce?auto=format&fit=crop&w=500&q=80',
    isPantryDefault: true,
    aliases: ['10%-os ecet', 'almaecet']
  },
  {
    id: 'viz',
    name: 'víz',
    displayName: 'Víz',
    imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=500&q=80',
    isPantryDefault: true
  }
];

export const ALL_DEFAULT_INGREDIENTS = [...INITIAL_INGREDIENTS, ...PANTRY_INGREDIENTS];
