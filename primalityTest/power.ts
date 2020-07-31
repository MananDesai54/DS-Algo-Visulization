export default function power(a:number,n:number,p:number):number {
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