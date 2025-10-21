// src/utils/colors.js

// Helper functions for color space conversions
const oklchToLab = (l, c, h) => {
  const a = c * Math.cos((h * Math.PI) / 180);
  const b = c * Math.sin((h * Math.PI) / 180);
  return [l, a, b];
};

const labToXyz = (l, a, b) => {
  const y = (l + 16) / 116;
  const x = a / 500 + y;
  const z = y - b / 200;

  const x3 = x * x * x;
  const y3 = y * y * y;
  const z3 = z * z * z;

  const xr = x3 > 0.008856 ? x3 : (x - 16 / 116) / 7.787;
  const yr = y3 > 0.008856 ? y3 : (y - 16 / 116) / 7.787;
  const zr = z3 > 0.008856 ? z3 : (z - 16 / 116) / 7.787;

  return [xr * 95.047, yr * 100, zr * 108.883];
};

const xyzToRgb = (x, y, z) => {
  let r = x * 3.2406 + y * -1.5372 + z * -0.4986;
  let g = x * -0.9689 + y * 1.8758 + z * 0.0415;
  let b = x * 0.0557 + y * -0.2040 + z * 1.0570;

  r = r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : 12.92 * r;
  g = g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : 12.92 * g;
  b = b > 0.0031308 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : 12.92 * b;

  return [
    Math.round(Math.max(0, Math.min(1, r)) * 255),
    Math.round(Math.max(0, Math.min(1, g)) * 255),
    Math.round(Math.max(0, Math.min(1, b)) * 255),
  ];
};

export const fixTailwindColors = (element) => {
  const clone = element.cloneNode(true);
  clone.style.position = 'absolute';
  clone.style.left = '-9999px';
  clone.style.width = `${element.offsetWidth}px`;
  document.body.appendChild(clone);

  // Convert oklch colors to rgb
  const convertOklch = (value) => {
    const oklchRegex = /oklch\(([^)]+)\)/g;
    return value.replace(oklchRegex, (match) => {
      try {
        const values = match.match(/oklch\(([^)]+)\)/)[1].trim().split(/\s+/);
        if (values.length !== 3) throw new Error('Invalid oklch format');
        const l = parseFloat(values[0]);
        const c = parseFloat(values[1]);
        const h = parseFloat(values[2]);
        if (isNaN(l) || isNaN(c) || isNaN(h)) throw new Error('Invalid oklch values');
        const [r, g, b] = xyzToRgb(...labToXyz(...oklchToLab(l, c, h)));
        return `rgb(${r}, ${g}, ${b})`;
      } catch (error) {
        console.warn('Failed to convert oklch to rgb:', match, error);
        return 'rgb(0, 0, 0)'; // Fallback to black
      }
    });
  };

  // Process all elements
  const allElements = clone.querySelectorAll('*');
  allElements.forEach(el => {
    const computed = window.getComputedStyle(el);

    // Handle background colors
    if (computed.backgroundColor.includes('oklch')) {
      el.style.backgroundColor = convertOklch(computed.backgroundColor);
    }

    // Handle text colors
    if (computed.color.includes('oklch')) {
      el.style.color = convertOklch(computed.color);
    }

    // Handle border colors
    if (computed.borderColor.includes('oklch')) {
      el.style.borderColor = convertOklch(computed.borderColor);
    }
  });

  return clone;
};
