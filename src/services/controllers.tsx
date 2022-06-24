const formatDate = (date: Date) => {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
  
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
  
    return [year, month, day].join("-");
  }


  const getData = async (from: string, to: string, date: string) => {
    const apiurl = `https://api.exchangerate.host/convert?from=${from}&to=${to}&date=${date}`;
    return await fetch(apiurl, {
      method: "GET",
    });
  };

  export {formatDate, getData}