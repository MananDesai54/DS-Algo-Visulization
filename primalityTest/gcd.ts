export default function gcd(number1:number,number2:number):number {
    if(number1<number2) {
        return gcd(number2,number1);
    }else if(number1%number2===0 ) {
        return number2;
    }else {
        return gcd(number2,number1%number2);
    }
}