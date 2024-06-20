export const generateID = () => {
  let result = '';
  const input_length = 5;
  const chars =
    '[@678^#(ABC,F3qr.sIJKN_+}{:OPQRghi)jDEklm:~noGH=2pL*$Mtuvwx<STU1>5VW`XYZa4bcd&efyz09]';
  for (let i = 0; i < input_length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const sortList = (a: any, b: any) => {
  return a.isCompleted > b.isCompleted
    ? 1
    : b.isCompleted > a.isCompleted
    ? -1
    : 0;
};
