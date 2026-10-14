// Initial sample data and presets for SCRAP2SPEC

export const INITIAL_STATS = {
  materialsAnalyzed: 24,
  opportunitiesFound: 67,
  materialReusedKg: 1280,
  potentialValueIdentified: 185000,
};

export const MONTHLY_REUSE_DATA = [
  { month: 'Jan', kg: 120, value: 16500 },
  { month: 'Feb', kg: 180, value: 24000 },
  { month: 'Mar', kg: 240, value: 34500 },
  { month: 'Apr', kg: 310, value: 45000 },
  { month: 'May', kg: 410, value: 65000 },
];

export const MATERIAL_CATEGORIES_DATA = [
  { name: 'Steel', percentage: 45, color: '#0284c7', amountKg: 576 },
  { name: 'Aluminium', percentage: 25, color: '#10b981', amountKg: 320 },
  { name: 'Plastic', percentage: 15, color: '#f59e0b', amountKg: 192 },
  { name: 'Copper', percentage: 10, color: '#f97316', amountKg: 128 },
  { name: 'Other', percentage: 5, color: '#8b5cf6', amountKg: 64 },
];

export const DEMO_PRESET = {
  materialType: 'Mild Steel',
  condition: 'Production Offcut',
  length: 1200,
  width: 600,
  thickness: 4,
  dimensionUnit: 'mm',
  quantity: 85,
  quantityUnit: 'kg',
  properties: {
    grade: 'IS 2062 Grade E250',
    strength: 'High (Yield ~250 MPa)',
    hardness: 'Moderate (~140 HB)',
    flexibility: 'Low',
    heatResistance: 'Moderate (Up to 400°C)',
    surfaceCondition: 'Clean mill scale with light protective oil',
    notes: 'Surplus plate cuts from industrial pressure tank base fabrication. Clean edges, zero rust.'
  },
  processes: ['Laser cutting', 'Welding', 'Drilling', 'Bending'],
  additionalNotes: 'Leftover plate strips after sheet nesting. Dimensions are consistent across 4 pieces.',
  imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
  imageName: 'steel_sheet_offcut_demo.jpg'
};

export const PRESET_SCENARIOS = [
  {
    id: 'demo-steel',
    label: 'Mild Steel Offcut',
    badge: '85 kg Plate',
    icon: '🔩',
    data: DEMO_PRESET
  },
  {
    id: 'demo-aluminium',
    label: 'Aluminium 6061-T6',
    badge: '32 kg Billets',
    icon: '✈️',
    data: {
      materialType: 'Aluminium',
      condition: 'Offcut',
      length: 800,
      width: 450,
      thickness: 6,
      dimensionUnit: 'mm',
      quantity: 32,
      quantityUnit: 'kg',
      properties: {
        grade: 'Alloy 6061-T6 (Aircraft / Marine)',
        strength: 'High Yield (276 MPa)',
        hardness: '95 HB',
        flexibility: 'Low',
        heatResistance: 'Moderate (200°C)',
        surfaceCondition: 'Clean extruded bar drop, no pitting',
        notes: 'Excess end-pieces from CNC automated milling job.'
      },
      processes: ['CNC machining', 'Drilling', 'Bending', 'Grinding'],
      additionalNotes: 'Homogeneous billets, ideal for precision enclosure blocks or heat dissipation plates.',
      imageUrl: 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=600&q=80',
      imageName: 'aluminium_billets_demo.jpg'
    }
  },
  {
    id: 'demo-copper',
    label: 'Copper Busbar Scrap',
    badge: '18 kg Bar',
    icon: '⚡',
    data: {
      materialType: 'Copper',
      condition: 'Rod/bar scrap',
      length: 500,
      width: 50,
      thickness: 8,
      dimensionUnit: 'mm',
      quantity: 18,
      quantityUnit: 'kg',
      properties: {
        grade: 'Electrolytic Tough Pitch (ETP 99.9%)',
        strength: 'Medium Tensile',
        hardness: 'Half Hard (80 HV)',
        flexibility: 'Medium',
        heatResistance: 'High (1085°C melt)',
        surfaceCondition: 'Bare bright, no oxidation',
        notes: 'Clipped end drop from substation panel switchboard assembly.'
      },
      processes: ['Drilling', 'Bending', 'CNC machining'],
      additionalNotes: 'Very high scrap value (₹380/kg), but produces 3.5x value as fabricated grounding links.',
      imageUrl: 'https://images.unsplash.com/photo-1589792905477-49774659b85c?auto=format&fit=crop&w=600&q=80',
      imageName: 'copper_busbar_demo.jpg'
    }
  },
  {
    id: 'demo-ss',
    label: 'Stainless Steel 304',
    badge: '45 kg Sheet',
    icon: '🛡️',
    data: {
      materialType: 'Stainless Steel',
      condition: 'Rejected component',
      length: 900,
      width: 500,
      thickness: 3,
      dimensionUnit: 'mm',
      quantity: 45,
      quantityUnit: 'kg',
      properties: {
        grade: 'AISI 304 (Austenitic Food-Grade)',
        strength: 'High (515 MPa UTS)',
        hardness: 'Non-magnetic, ~180 HB',
        flexibility: 'Low',
        heatResistance: 'High (870°C)',
        surfaceCondition: '2B Mill Finish, clean',
        notes: 'Mis-stamped outer cover panels from pharmaceutical vessel run.'
      },
      processes: ['Laser cutting', 'Welding', 'Bending', 'Grinding'],
      additionalNotes: 'Prime corrosion-resistant alloy suitable for sanitary strainers or washdown brackets.',
      imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
      imageName: 'stainless_sheet_demo.jpg'
    }
  }
];

export const INITIAL_HISTORY = [
  {
    id: 'mat-hist-1',
    materialName: 'Mild Steel Sheet',
    materialType: 'Mild Steel',
    condition: 'Production Offcut',
    dimensions: '1200 × 600 × 4 mm',
    length: 1200,
    width: 600,
    thickness: 4,
    dimensionUnit: 'mm',
    quantity: 85,
    quantityUnit: 'kg',
    dateAnalyzed: '08 Oct 2026',
    reusePotential: 87,
    opportunitiesCount: 5,
    status: 'Analyzed',
    processes: ['Laser cutting', 'Welding', 'Drilling', 'Bending'],
    imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
    properties: {
      grade: 'IS 2062',
      strength: 'High',
      surfaceCondition: 'Light oil'
    }
  },
  {
    id: 'mat-hist-2',
    materialName: 'Aluminium 6061 Offcuts',
    materialType: 'Aluminium',
    condition: 'Offcut',
    dimensions: '800 × 450 × 6 mm',
    length: 800,
    width: 450,
    thickness: 6,
    dimensionUnit: 'mm',
    quantity: 32,
    quantityUnit: 'kg',
    dateAnalyzed: '06 Oct 2026',
    reusePotential: 92,
    opportunitiesCount: 4,
    status: 'Analyzed',
    processes: ['CNC machining', 'Drilling', 'Bending', 'Grinding'],
    imageUrl: 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=600&q=80',
    properties: {
      grade: 'Alloy 6061-T6',
      strength: 'High',
      surfaceCondition: 'Clean extruded'
    }
  },
  {
    id: 'mat-hist-3',
    materialName: 'Copper Busbar End Scrap',
    materialType: 'Copper',
    condition: 'Rod/bar scrap',
    dimensions: '500 × 50 × 8 mm',
    length: 500,
    width: 50,
    thickness: 8,
    dimensionUnit: 'mm',
    quantity: 18,
    quantityUnit: 'kg',
    dateAnalyzed: '04 Oct 2026',
    reusePotential: 95,
    opportunitiesCount: 3,
    status: 'Analyzed',
    processes: ['CNC machining', 'Drilling', 'Bending'],
    imageUrl: 'https://images.unsplash.com/photo-1589792905477-49774659b85c?auto=format&fit=crop&w=600&q=80',
    properties: {
      grade: 'ETP Electrolytic Copper (99.9%)',
      strength: 'Medium',
      surfaceCondition: 'Bare bright'
    }
  },
  {
    id: 'mat-hist-4',
    materialName: 'Stainless Steel 304 Rings',
    materialType: 'Stainless Steel',
    condition: 'Rejected component',
    dimensions: '300 × 300 × 3 mm',
    length: 300,
    width: 300,
    thickness: 3,
    dimensionUnit: 'mm',
    quantity: 45,
    quantityUnit: 'kg',
    dateAnalyzed: '01 Oct 2026',
    reusePotential: 84,
    opportunitiesCount: 4,
    status: 'In Production',
    processes: ['Laser cutting', 'Welding', 'Grinding'],
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    properties: {
      grade: 'AISI 304 (Austenitic)',
      strength: 'High',
      surfaceCondition: '2B Mill Finish'
    }
  }
];

export const INITIAL_SAVED_OPPORTUNITIES = [
  {
    id: 'saved-1',
    materialId: 'mat-hist-1',
    productName: 'Industrial Mounting Brackets',
    material: 'Mild Steel (4 mm)',
    compatibility: 94,
    potentialValue: 8500,
    materialRequired: 12,
    materialUtilization: 91,
    complexity: 'Low',
    dateSaved: '08 Oct 2026',
    status: 'In Production', // New, Reviewing, Prototype Planned, In Production, Completed
    category: 'Structural Hardware',
    materialCostSaved: 3200,
    processingCost: 2100,
    estimatedProductionCost: 5300,
    potentialMargin: 3200,
    whySuitable: 'The 4 mm sheet thickness and high yield strength make this material ideal for heavy equipment support brackets. Laser cutting and bending already match shop tooling.',
    processes: ['Laser cutting', 'Bending', 'Drilling', 'Welding', 'Powder Coating']
  },
  {
    id: 'saved-2',
    materialId: 'mat-hist-2',
    productName: 'CNC Electronics Enclosures',
    material: 'Aluminium 6061 (6 mm)',
    compatibility: 92,
    potentialValue: 14500,
    materialRequired: 8,
    materialUtilization: 88,
    complexity: 'Medium',
    dateSaved: '06 Oct 2026',
    status: 'Prototype Planned',
    category: 'Industrial Electronics',
    materialCostSaved: 5400,
    processingCost: 3800,
    estimatedProductionCost: 9200,
    potentialMargin: 5300,
    whySuitable: '6061-T6 aluminium offers outstanding thermal conductivity and corrosion resistance. 6 mm stock allows precise stepped pockets and seal grooves for IP65 rated junction enclosures.',
    processes: ['CNC machining', 'Drilling', 'Tapping', 'Anodizing']
  },
  {
    id: 'saved-3',
    materialId: 'mat-hist-3',
    productName: 'High-Current Grounding Busbars',
    material: 'Electrolytic Copper (8 mm)',
    compatibility: 96,
    potentialValue: 16000,
    materialRequired: 5,
    materialUtilization: 94,
    complexity: 'Low',
    dateSaved: '05 Oct 2026',
    status: 'Reviewing',
    category: 'Electrical Switchgear',
    materialCostSaved: 6800,
    processingCost: 1900,
    estimatedProductionCost: 8700,
    potentialMargin: 7300,
    whySuitable: 'Pure electrolytic copper is in high demand for electrical control panels. Offcuts need only shear trimming, hole punching, and radius edge deburring to meet IEC switchgear specs.',
    processes: ['Drilling', 'Bending', 'Tin Plating']
  }
];

export const MATERIAL_TYPE_OPTIONS = [
  'Mild Steel',
  'Stainless Steel',
  'Aluminium',
  'Copper',
  'Brass',
  'Plastic',
  'Rubber',
  'Wood',
  'Other'
];

export const CONDITION_OPTIONS = [
  'Leftover production material',
  'Rejected component',
  'Offcut',
  'Sheet scrap',
  'Rod/bar scrap',
  'Mixed material',
  'Other'
];

export const PROCESS_OPTIONS = [
  'CNC machining',
  'Laser cutting',
  'Welding',
  'Drilling',
  'Bending',
  '3D printing',
  'Injection molding',
  'Grinding',
  'Assembly',
  'Other'
];
