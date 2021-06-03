import CoordsValidator from '../coordsValidator';

const validator = new CoordsValidator();

test.each([
  ['[0.0, 0.1]', { latitude: '0.0', longitude: '0.1' }],
  ['0.0, 1.1', { latitude: '0.0', longitude: '1.1' }],
  ['[0.0,-179.1]', { latitude: '0.0', longitude: '-179.1' }],
  ['31.0,0.0', { latitude: '31.0', longitude: '0.0' }],
  ['[-50.5,111.1]', { latitude: '-50.5', longitude: '111.1' }],
])(
  ('should return object with coords'),
  (input, expected) => {
    expect(validator.validate(input)).toEqual(expected);
  },
);

test.each([
  ['blah', 'Неверный формат координат.'],
  ['-91.2, 1.1', 'Координаты за пределами допустимых значений.'],
  ['[0.0,191.1]', 'Координаты за пределами допустимых значений.'],
])(
  ('should throw error'),
  (input, expected) => {
    expect(() => {
      validator.validate(input);
    }).toThrowError(expected);
  },
);
