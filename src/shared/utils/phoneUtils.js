
export const formatPhoneNumber = (value) => {
    const allowedCodes = ["+38", "+1", "+49", "+48", "+33"];
    const cleaned = value.replace(/[^\d+]/g, "");
    const countryCode = allowedCodes.find((code) => cleaned.startsWith(code));
  
    if (countryCode) {
      const withoutCode = cleaned.slice(countryCode.length);
      let formatted = "";
  
      switch (countryCode) {
        case "+38": // Ukraine
          const matchUA = withoutCode.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);
          if (matchUA) {
            formatted = `+38 (${matchUA[1]})-${matchUA[2]}-${matchUA[3]}-${matchUA[4]}`;
          }
          break;
  
        case "+1": // USA
          const matchUS = withoutCode.match(/^(\d{3})(\d{3})(\d{4})$/);
          if (matchUS) {
            formatted = `+1 (${matchUS[1]})-${matchUS[2]}-${matchUS[3]}`;
          }
          break;
  
        case "+49": // Germany
          const matchDE = withoutCode.match(/^(\d{3})(\d{3})(\d{4})$/);
          if (matchDE) {
            formatted = `+49 (${matchDE[1]})-${matchDE[2]}-${matchDE[3]}`;
          }
          break;
  
        case "+48": // Poland
          const matchPL = withoutCode.match(/^(\d{3})(\d{3})(\d{3})$/);
          if (matchPL) {
            formatted = `+48 (${matchPL[1]})-${matchPL[2]}-${matchPL[3]}`;
          }
          break;
  
        case "+33": // France
          const matchFR = withoutCode.match(
            /^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/
          );
          if (matchFR) {
            formatted = `+33 (${matchFR[1]})-${matchFR[2]}-${matchFR[3]}-${matchFR[4]}-${matchFR[5]}`;
          }
          break;
  
        default:
          return value;
      }
      return formatted || value;
    }
    return value;
};
