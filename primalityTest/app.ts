let k = Math.floor((Math.random()*(2000000-1000000)))+1000000;
// console.log(k);

function gcd(number1:number,number2:number):number {
    if(number1<number2) {
        return gcd(number2,number1);
    }else if(number1%number2===0 ) {
        return number2;
    }else {
        return gcd(number2,number1%number2);
    }
}

function power(a:number,n:number,p:number):number {
    let res = 1;
    a = a%p;

    while(n>0) {
        if(n&1) {
            res = (res*a)%p;

            n=n>>1;
            a = (a*a)%p
        }
    }
    return res;
}

function isPrime(number:number):boolean {
    if(number<=1 || number===4) {
        return false;
    }if(number<=3) {
        return true;
    }
    while(k>0) {
        const a = Math.floor(Math.random()*(number-4)+2);
        if(gcd(number,a)!==1)
            return false;
        if(power(a,number-1,number)!==1) {
            return false;
        }
        k--;
    }
    return true;
}

console.log('15 is prime = ',isPrime(15551));