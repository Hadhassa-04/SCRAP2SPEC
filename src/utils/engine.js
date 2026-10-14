// SCRAP2SPEC Smart Recommendation Engine (Rule-based & procedural prototype)

/**
 * Normalizes dimensions to millimeters for calculation
 */
export function normalizeToMm(val, unit) {
  const num = parseFloat(val) || 10;
  if (unit === 'cm') return num * 10;
  if (unit === 'inch') return num * 25.4;
  return num; // default mm
}

/**
 * Normalizes quantity to kg equivalent for economic modeling
 */
export function estimateKg(quantity, unit, density = 7.85) {
  const q = parseFloat(quantity) || 50;
  if (unit === 'kg') return q;
  if (unit === 'sheets') return q * 18; // approx sheet average
  if (unit === 'pieces') return q * 4.5;
  if (unit === 'meters') return q * 3.2;
  return q;
}

/**
 * Material Catalog with targeted domain knowledge
 */
const CATALOG_BY_MATERIAL = {
  'Mild Steel': [
    {
      productName: 'Industrial Mounting Brackets',
      category: 'Structural Hardware',
      baseCompatibility: 94,
      requiredFraction: 0.14,
      complexity: 'Low',
      valueMultiplier: 100, // per kg
      marginRatio: 0.38,
      idealProcesses: ['Laser cutting', 'Bending', 'Welding', 'Drilling'],
      whySuitable: 'The sheet thickness and structural rigidity are ideal for heavy-duty vibration-resistant mounting brackets. Existing shop bending and welding capabilities eliminate outside contractor costs.',
      processFlow: ['Raw Material Shear/Prep', 'Laser Cutting Profiles', 'CNC Press Brake Bending', 'Hole Drilling & Chamfering', 'Fillet Welding Stiffeners', 'Anti-Corrosion Primer', 'Quality & Load Inspection']
    },
    {
      productName: 'Heavy-Duty Machine Guard Components',
      category: 'Factory Safety Equipment',
      baseCompatibility: 88,
      requiredFraction: 0.21,
      complexity: 'Medium',
      valueMultiplier: 140,
      marginRatio: 0.42,
      idealProcesses: ['Laser cutting', 'Welding', 'Bending', 'Grinding'],
      whySuitable: 'Mild steel plate scrap provides solid impact resistance required by OSHA/ISO safety standards. The surface condition allows seamless powder coating after weld assembly.',
      processFlow: ['Nesting Sheet Layout', 'Laser/Plasma Profile Cutting', 'Edge Grinding & Deburring', 'Tab & Slot Fit-up', 'MIG Welding Perimeter', 'Industrial Powder Coat', 'Dimensional Inspection']
    },
    {
      productName: 'Storage Rack Cantilever Brackets',
      category: 'Warehouse & Logistics Fixtures',
      baseCompatibility: 85,
      requiredFraction: 0.17,
      complexity: 'Low',
      valueMultiplier: 110,
      marginRatio: 0.36,
      idealProcesses: ['Laser cutting', 'Drilling', 'Welding', 'Bending'],
      whySuitable: 'High tensile strength allows reliable load-bearing capacity for warehouse shelving arms. Straight offcut edges minimize sheet trimming waste.',
      processFlow: ['Stock Cutting to Length', 'Laser Piercing Pin Holes', 'Flange Bending', 'Gusset Plate Welding', 'Zinc Electroplating', 'Batch Load Testing']
    },
    {
      productName: 'Modular Tool Holder Plates',
      category: 'Workshop Tooling',
      baseCompatibility: 79,
      requiredFraction: 0.12,
      complexity: 'Medium',
      valueMultiplier: 95,
      marginRatio: 0.34,
      idealProcesses: ['CNC machining', 'Drilling', 'Grinding'],
      whySuitable: 'Stable steel thickness serves as reliable fixture plates for CNC and bench workstations. Easy to drill standard grid holes for tool retention pegs.',
      processFlow: ['Face Milling Cleanup', 'CNC Coordinate Hole Drilling', 'Internal Tapping M8/M10', 'Precision Surface Grinding', 'Black Oxide Chemical Finish', 'Final Caliper Verification']
    },
    {
      productName: 'Vibration Damping Base Flanges',
      category: 'Plant Infrastructure',
      baseCompatibility: 83,
      requiredFraction: 0.24,
      complexity: 'Medium',
      valueMultiplier: 125,
      marginRatio: 0.40,
      idealProcesses: ['Laser cutting', 'Drilling', 'Welding'],
      whySuitable: 'Heavy mass and plate thickness make these offcuts optimal for anchoring motor stands and pump bases, reducing harmonic plant vibration.',
      processFlow: ['Circular Profile Cutting', 'Center Bore Boring', 'Four-Corner Slotted Anchor Drilling', 'Weld Bevel Chamfering', 'Anti-Rust Coating', 'Flatness Tolerance Verification']
    }
  ],

  'Stainless Steel': [
    {
      productName: 'Sanitary Drain Strainers & Pans',
      category: 'Food & Dairy Processing',
      baseCompatibility: 95,
      requiredFraction: 0.16,
      complexity: 'Medium',
      valueMultiplier: 260,
      marginRatio: 0.45,
      idealProcesses: ['Laser cutting', 'Bending', 'Welding', 'Grinding'],
      whySuitable: 'Stainless steel provides essential anti-corrosive properties and hygienic compliance. Offcut sheets can be laser perforated into premium hygienic filters.',
      processFlow: ['Laser Perforation Micro-holes', 'Edge Hemming & Bending', 'TIG Sanitary Welding', 'Acid Pickling & Passivation', 'Electropolish Finish', 'Microbiological Crevice Inspection']
    },
    {
      productName: 'Industrial Sensor Enclosures',
      category: 'Automation & Instrumentation',
      baseCompatibility: 91,
      requiredFraction: 0.11,
      complexity: 'High',
      valueMultiplier: 340,
      marginRatio: 0.48,
      idealProcesses: ['CNC machining', 'Laser cutting', 'Bending', 'Assembly'],
      whySuitable: 'Austenitic stainless properties protect sensitive optical and magnetic sensors in washdown manufacturing environments.',
      processFlow: ['Sheet Laser Blanking', 'Precision Air Bending', 'Corner TIG Fusion', 'Gasket Channel Milling', 'Cleanroom Passivation', 'IP67 Ingress Test']
    },
    {
      productName: 'Exhaust Heat Deflector Shields',
      category: 'Automotive & GenSet Components',
      baseCompatibility: 87,
      requiredFraction: 0.18,
      complexity: 'Medium',
      valueMultiplier: 220,
      marginRatio: 0.40,
      idealProcesses: ['Laser cutting', 'Bending', 'Drilling'],
      whySuitable: 'Superior thermal stability and low oxidation up to 800°C make this material ideal for generator exhaust and manifold heat guards.',
      processFlow: ['Pattern Contouring', 'Louver Stamping/Laser Piercing', 'Multi-Radius Roll Bending', 'Mounting Hole Piercing', 'De-burring & Satin Finish', 'Thermal Stress Check']
    },
    {
      productName: 'Chemical Dosing Pump Brackets',
      category: 'Process Engineering Hardware',
      baseCompatibility: 84,
      requiredFraction: 0.14,
      complexity: 'Low',
      valueMultiplier: 190,
      marginRatio: 0.38,
      idealProcesses: ['Laser cutting', 'Drilling', 'Bending'],
      whySuitable: 'Resistant to caustic wash solutions, acid vapours, and high moisture, preventing rust-related equipment downtime.',
      processFlow: ['Laser Profiling', 'CNC Press Brake Forming', 'Countersink Hole Drilling', 'Deburring Vibratory Tumble', 'Passivation Bath', 'Inspection']
    }
  ],

  'Aluminium': [
    {
      productName: 'Electronics Enclosure Chassis',
      category: 'Industrial Electronics',
      baseCompatibility: 93,
      requiredFraction: 0.13,
      complexity: 'Medium',
      valueMultiplier: 280,
      marginRatio: 0.44,
      idealProcesses: ['CNC machining', 'Bending', 'Drilling', 'Laser cutting'],
      whySuitable: 'Aluminium provides superior EMI/RFI shielding, excellent thermal dissipation, and lightweight characteristics ideal for DIN-rail control enclosures.',
      processFlow: ['Waterjet/Laser Profile Blanking', 'CNC Pocketing & Port Milling', 'Precision 90° Box Bending', 'M3/M4 Rivet Nut Installation', 'Clear/Black Anodization', 'Continuity & Dimensional Check']
    },
    {
      productName: 'Extruded Heat Sink Assemblies',
      category: 'Power Electronics',
      baseCompatibility: 89,
      requiredFraction: 0.15,
      complexity: 'Medium',
      valueMultiplier: 240,
      marginRatio: 0.42,
      idealProcesses: ['CNC machining', 'Drilling', 'Grinding'],
      whySuitable: 'High thermal conductivity allows efficient passive cooling for variable frequency drives (VFDs) and high-power LED arrays.',
      processFlow: ['Billet Face Skiving/Slotting', 'Mounting Hole CNC Drilling', 'Thermal Paste Base Lap Polish', 'Fin Edge Deburring', 'Black Anodize Thermal Emissivity', 'Thermal Resistance Bench Test']
    },
    {
      productName: 'Pneumatic Manifold Sub-Plates',
      category: 'Automation & Fluid Power',
      baseCompatibility: 85,
      requiredFraction: 0.18,
      complexity: 'High',
      valueMultiplier: 310,
      marginRatio: 0.46,
      idealProcesses: ['CNC machining', 'Drilling', 'Grinding'],
      whySuitable: 'Dense, homogeneous aluminium blocks machine cleanly with high surface lubricity, perfect for multi-port pneumatic directional valves.',
      processFlow: ['Billet Face Squaring', 'Deep Hole Cross-Drilling', 'BSPP/NPT Thread Tapping', 'O-Ring Counter-Bore Milling', 'Hard Anodize Surface', '10 Bar Pressure Leak Test']
    },
    {
      productName: 'Machine Inspection Light Brackets',
      category: 'Ergonomic Workshop Fixtures',
      baseCompatibility: 82,
      requiredFraction: 0.09,
      complexity: 'Low',
      valueMultiplier: 160,
      marginRatio: 0.36,
      idealProcesses: ['Laser cutting', 'Bending', 'Drilling'],
      whySuitable: 'Lightweight offcuts can be quickly shaped into articulating arm mounts for operator inspection workstations without adding arm strain.',
      processFlow: ['Sheet Blank Laser Cutting', 'Swivel Slot Milling', 'Rotational Detent Stamping', 'Corner Radiusing', 'Bead Blast Finish', 'Assembly with Friction Knobs']
    }
  ],

  'Copper': [
    {
      productName: 'Switchgear Busbar Jumpers',
      category: 'Electrical Distribution',
      baseCompatibility: 96,
      requiredFraction: 0.15,
      complexity: 'Low',
      valueMultiplier: 620,
      marginRatio: 0.48,
      idealProcesses: ['Drilling', 'Bending', 'CNC machining'],
      whySuitable: 'Exceptional electrical conductivity (IACS > 99%) makes copper offcuts prime material for high-amp distribution boards.',
      processFlow: ['Precision Saw Cutting to Length', 'Bolt Hole Punching/Drilling', 'Edge Radius Rounding', 'Hydraulic Offset Bending', 'Bright Tin Electro-Plating', 'Millivolt Drop Conductivity Test']
    },
    {
      productName: 'Grounding Earth Terminal Bars',
      category: 'Substation Safety Equipment',
      baseCompatibility: 90,
      requiredFraction: 0.20,
      complexity: 'Low',
      valueMultiplier: 540,
      marginRatio: 0.45,
      idealProcesses: ['Drilling', 'CNC machining', 'Grinding'],
      whySuitable: 'Heavy gauge copper bars can be drilled with standard pitch grounding screw points, fetching 4x the value of scrap metal dealers.',
      processFlow: ['Bar Section Squaring', 'Multi-Spindle Gang Drilling', 'Tapping M6 Ground Studs', 'Wire Brush Cleaning', 'Anti-Tarnish Clear Lacquer', 'Dielectric & Resistance Check']
    },
    {
      productName: 'Spot Welding Electrode Adapters',
      category: 'Welding Tooling Consumables',
      baseCompatibility: 86,
      requiredFraction: 0.12,
      complexity: 'Medium',
      valueMultiplier: 680,
      marginRatio: 0.50,
      idealProcesses: ['CNC machining', 'Drilling'],
      whySuitable: 'High thermal and electrical transfer handles high cyclic pulse current without burning out electrode holders.',
      processFlow: ['Lathe Turning Outer Diameter', 'Taper Bore Reaming', 'Cooling Water Channel Drilling', 'Thread Milling M18', 'Electrode Alignment Verification', 'Pressure Fluid Leak Test']
    }
  ],

  'Brass': [
    {
      productName: 'Pneumatic Push-Fit Adapter Fittings',
      category: 'Fluid & Gas Connectors',
      baseCompatibility: 92,
      requiredFraction: 0.16,
      complexity: 'Medium',
      valueMultiplier: 420,
      marginRatio: 0.46,
      idealProcesses: ['CNC machining', 'Drilling', 'Grinding'],
      whySuitable: 'Free-cutting brass offcuts offer near-zero tool wear and excellent spark-free spark compliance in flammable fluid applications.',
      processFlow: ['CNC Lathe Outer Contouring', 'Hexagon Milling', 'Internal Step Boring', 'Internal & External Thread Chasing', 'Electroless Nickel Plating', 'Helium Sniffer Seal Test']
    },
    {
      productName: 'Low-Friction Guide Bushing Spacers',
      category: 'Mechanical Assemblies',
      baseCompatibility: 88,
      requiredFraction: 0.14,
      complexity: 'Medium',
      valueMultiplier: 380,
      marginRatio: 0.42,
      idealProcesses: ['CNC machining', 'Drilling', 'Grinding'],
      whySuitable: 'Inherent self-lubricating characteristics prevent steel-on-steel galling in reciprocal shafts and conveyor pivots.',
      processFlow: ['Bar Stock Facing', 'Precision Bore Reaming H7', 'Spiral Grease Groove Cutting', 'Parting Off to Width', 'Vibratory Deburring', 'Micrometer ID/OD Inspection']
    },
    {
      productName: 'Marine Grade Instrument Bezels',
      category: 'Marine & Outdoor Hardware',
      baseCompatibility: 83,
      requiredFraction: 0.11,
      complexity: 'Low',
      valueMultiplier: 360,
      marginRatio: 0.40,
      idealProcesses: ['CNC machining', 'Drilling'],
      whySuitable: 'Excellent resistance to saltwater dezincification makes brass offcuts desirable for marine dashboard gauges and dial rings.',
      processFlow: ['Ring CNC Profiling', 'Bevel Chamfer Cutting', 'Blind Screw Hole Drilling', 'Mirror Buffing / Satin Brushing', 'Marine Polyurethane Clear Coat', 'Salt Spray Resistance Verification']
    }
  ],

  'Plastic': [
    {
      productName: 'Machine Slide Wear Strips & Guides',
      category: 'Conveyor & Automation Components',
      baseCompatibility: 94,
      requiredFraction: 0.15,
      complexity: 'Low',
      valueMultiplier: 130,
      marginRatio: 0.50,
      idealProcesses: ['CNC machining', 'Drilling', 'Laser cutting'],
      whySuitable: 'Engineering plastic scrap (UHMWPE/Nylon/POM) provides ultra-low coefficient of friction and high abrasion resistance for conveyor tracks.',
      processFlow: ['Strip Saws to Width', 'CNC Dovetail Profile Routing', 'Countersunk Mounting Hole Drilling', 'Edge Chamfer Shaving', 'Static Discharge Neutralization', 'Surface Roughness Check']
    },
    {
      productName: 'Transparent Protective Splash Shields',
      category: 'Machine Safety Guards',
      baseCompatibility: 89,
      requiredFraction: 0.22,
      complexity: 'Low',
      valueMultiplier: 160,
      marginRatio: 0.45,
      idealProcesses: ['Laser cutting', 'Bending', 'Drilling'],
      whySuitable: 'Acrylic and polycarbonate offcut sheets offer optical clarity and high shatter resistance to contain flying metal chips and coolant spray.',
      processFlow: ['Protective Film Masking', 'Laser Perimeter Cutting', 'Strip Heater Thermo-Line Bending', 'Mounting Hole Piercing', 'Flame/Buffing Polished Edges', 'Optical Distortion Check']
    },
    {
      productName: 'Cable Carrier & Chain Spacers',
      category: 'Robotics & Automation',
      baseCompatibility: 85,
      requiredFraction: 0.10,
      complexity: 'Low',
      valueMultiplier: 110,
      marginRatio: 0.42,
      idealProcesses: ['CNC machining', '3D printing', 'Drilling'],
      whySuitable: 'Lightweight dielectric plastic prevents cable chafing and eliminates electrical shorts in articulated drag chains.',
      processFlow: ['Plate Gang Nesting', 'CNC Router Contouring', 'Center Pin Hole Reaming', 'Tumble Deburr', 'Quality Sizing Check', 'Bulk Packaging']
    }
  ],

  'Rubber': [
    {
      productName: 'Heavy Equipment Vibration Damping Pads',
      category: 'Machinery Isolation',
      baseCompatibility: 92,
      requiredFraction: 0.25,
      complexity: 'Low',
      valueMultiplier: 110,
      marginRatio: 0.44,
      idealProcesses: ['Drilling', 'Grinding', 'Assembly'],
      whySuitable: 'Resilient elastomeric properties absorb shock loads and prevent motor vibrations from transferring into factory floor slabs.',
      processFlow: ['Waterjet/Die Punching Shape', 'Waffle Texture Surface Embossing', 'Central Anchor Hole Piercing', 'Edge Trimming', 'Durometer Hardness Testing', 'Load Deflection Test']
    },
    {
      productName: 'Flange Sealing Gasket Rings',
      category: 'Industrial Piping',
      baseCompatibility: 88,
      requiredFraction: 0.15,
      complexity: 'Low',
      valueMultiplier: 140,
      marginRatio: 0.48,
      idealProcesses: ['Drilling', 'Assembly', 'Other'],
      whySuitable: 'Compressible rubber scrap sheets seal surface irregularities between pipe flanges under high hydraulic pressures.',
      processFlow: ['Concentric Circle Die Cutting', 'Bolt Hole Circle CNC Punching', 'Flash Free Edge Cleaning', 'Thickness Caliper Check', 'Pressure Sealing Trial']
    }
  ],

  'Wood': [
    {
      productName: 'Heavy Equipment Shipping Cradle Chocks',
      category: 'Industrial Packaging & Crating',
      baseCompatibility: 91,
      requiredFraction: 0.30,
      complexity: 'Low',
      valueMultiplier: 65,
      marginRatio: 0.42,
      idealProcesses: ['Drilling', 'Assembly', 'Grinding'],
      whySuitable: 'Dense timber offcuts provide shock absorption and structural blocking preventing machine roll during sea or freight transport.',
      processFlow: ['Bandsaw Angle Notching', 'Radius Radius Grooving', 'Through-Bolt Drilling', 'Heat Treatment Fungus Stamp (ISPM-15)', 'Load Stress Verification']
    },
    {
      productName: 'Tool Room Organiser Shadow Trays',
      category: '5S Lean Workshop Equipment',
      baseCompatibility: 86,
      requiredFraction: 0.18,
      complexity: 'Medium',
      valueMultiplier: 85,
      marginRatio: 0.40,
      idealProcesses: ['CNC machining', 'Drilling'],
      whySuitable: 'Soft wood offcuts protect delicate carbide milling cutters and micrometers from tip chipping in tool drawers.',
      processFlow: ['Face Planer Flattening', 'CNC Router Pocket Pockets', 'Chamfer Bit Inscriptions', 'Sanding 220 Grit', 'Danish Oil Sealant Coat', 'Tool Fit Alignment']
    }
  ],

  'Other': [
    {
      productName: 'Universal Support Gussets & Shim Packs',
      category: 'General Fabrication',
      baseCompatibility: 84,
      requiredFraction: 0.15,
      complexity: 'Low',
      valueMultiplier: 90,
      marginRatio: 0.35,
      idealProcesses: ['Laser cutting', 'Drilling', 'Grinding'],
      whySuitable: 'General offcuts can always be repurposed into standard triangular weld gussets and leveling shims for steel structures.',
      processFlow: ['Pattern Cutting', 'Chamfer Edge Prep', 'Drill Stacking', 'Deburring', 'Surface Degreasing', 'Packaging']
    },
    {
      productName: 'Custom Utility Equipment Handles',
      category: 'Machine Hardware',
      baseCompatibility: 80,
      requiredFraction: 0.12,
      complexity: 'Medium',
      valueMultiplier: 110,
      marginRatio: 0.38,
      idealProcesses: ['CNC machining', 'Bending', 'Welding'],
      whySuitable: 'Assorted scrap stock easily forms ergonomic handles and pull bars for factory cart doors and equipment covers.',
      processFlow: ['Profile Trimming', 'Bending Contours', 'End Tapping', 'Finish Buffing', 'Quality Inspection']
    }
  ]
};

/**
 * Main AI recommendation function
 */
export function generateRecommendations(materialInput) {
  const {
    materialType = 'Mild Steel',
    condition = 'Offcut',
    length = 1000,
    width = 500,
    thickness = 4,
    dimensionUnit = 'mm',
    quantity = 80,
    quantityUnit = 'kg',
    processes = ['Laser cutting', 'Welding', 'Drilling'],
    properties = {}
  } = materialInput;

  const lengthMm = normalizeToMm(length, dimensionUnit);
  const widthMm = normalizeToMm(width, dimensionUnit);
  const thicknessMm = normalizeToMm(thickness, dimensionUnit);
  const totalKg = estimateKg(quantity, quantityUnit);

  // Determine material catalog items
  const catalog = CATALOG_BY_MATERIAL[materialType] || CATALOG_BY_MATERIAL['Mild Steel'];

  // Calculate reuse potential score based on inputs
  let reusePotential = 82;
  if (condition.toLowerCase().includes('offcut')) reusePotential += 5;
  if (condition.toLowerCase().includes('leftover')) reusePotential += 6;
  if (condition.toLowerCase().includes('rejected')) reusePotential -= 2;
  if (processes.length >= 3) reusePotential += 4;
  if (thicknessMm >= 2 && thicknessMm <= 12) reusePotential += 3;
  if (reusePotential > 95) reusePotential = 95;
  if (reusePotential < 65) reusePotential = 68;

  // Generate 4 to 5 recommendations
  const recommendations = catalog.map((template, index) => {
    // Process match score
    const matchingProcesses = template.idealProcesses.filter(p => processes.includes(p));
    const processBoost = (matchingProcesses.length / template.idealProcesses.length) * 8;

    // Adjusted compatibility
    let compatibility = Math.min(98, Math.max(72, Math.round(template.baseCompatibility + processBoost - (index * 3))));

    // Material required in kg for standard batch
    const requiredKg = Math.max(4, Math.round(totalKg * template.requiredFraction));
    const utilization = Math.min(95, Math.max(78, Math.round(84 + (10 - index * 2) + (Math.random() * 4 - 2))));

    // Economics calculations
    const scrapBaseRate = materialType === 'Copper' ? 380 : materialType === 'Aluminium' ? 140 : materialType === 'Stainless Steel' ? 110 : 32;
    const materialCostSaved = Math.round(requiredKg * scrapBaseRate * 2.2);
    const processingCost = Math.round(requiredKg * (template.complexity === 'High' ? 180 : template.complexity === 'Medium' ? 120 : 75));
    const estimatedProductionCost = materialCostSaved + processingCost;
    
    // Potential value
    const potentialValue = Math.round(estimatedProductionCost / (1 - template.marginRatio));
    const potentialMargin = potentialValue - estimatedProductionCost;

    return {
      id: `rec-${Date.now()}-${index + 1}`,
      productName: template.productName,
      category: template.category,
      compatibility,
      materialRequired: requiredKg,
      materialUtilization: utilization,
      complexity: template.complexity,
      potentialValue,
      materialCostSaved,
      processingCost,
      estimatedProductionCost,
      potentialMargin,
      whySuitable: template.whySuitable,
      processFlow: template.processFlow,
      confidence: compatibility,
      safetyDisclaimer: 'These recommendations are preliminary prototype estimates. Actual production feasibility and structural tolerances must be validated by a qualified manufacturing engineer before production.'
    };
  });

  // Material summary overview explanation
  const explanation = `This ${materialType} (${condition.toLowerCase()}) demonstrates an exceptional ${reusePotential}% reuse score. Its dimensions (${lengthMm}×${widthMm}×${thicknessMm} mm) and available processes (${processes.slice(0, 3).join(', ')}) provide immediate suitability for high-margin fabricated sub-components, avoiding scrap yard markdown.`;

  return {
    materialSummary: {
      materialType,
      materialName: `${materialType} ${condition}`,
      condition,
      dimensions: `${length} × ${width} × ${thickness} ${dimensionUnit}`,
      dimensionsMm: `${lengthMm} × ${widthMm} × ${thicknessMm} mm`,
      quantity: `${quantity} ${quantityUnit}`,
      quantityKg: totalKg,
      availableProcesses: processes,
      reusePotential,
      explanation,
      machinabilityScore: materialType === 'Aluminium' || materialType === 'Brass' ? 'High' : 'Moderate',
      weldabilityScore: materialType === 'Mild Steel' || materialType === 'Stainless Steel' ? 'Excellent' : 'Specialized',
      scrapMarketBenchmark: `₹${materialType === 'Copper' ? '380' : materialType === 'Aluminium' ? '140' : '32'}/kg`,
      upcyclePotentialValue: `₹${materialType === 'Copper' ? '1,100' : materialType === 'Aluminium' ? '450' : '180'}/kg`
    },
    recommendations
  };
}
