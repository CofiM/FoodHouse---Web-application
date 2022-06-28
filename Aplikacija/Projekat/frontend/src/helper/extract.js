export function ExtractData(token,data)
{
    let dataString = data.toString();
    let num = dataString.length;

    let jwtData = token.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData);

    let name = decodedJwtJsonData.substring(decodedJwtJsonData.indexOf(dataString));
    let subname = name.substring(num+3,name.indexOf(",")-1);

    return subname
} 