export let sentArr:Array<string> = []
let delay = 100
function providerOne(email:string,retries:number,delay:number){
	return new Promise((resolve,reject)=>{
		if(retries > 3){
			reject({
				email:email,
				retries:email
			})
		}
		const arr = ['user@example.com', 'user2@example.com']
		if(arr.includes(email)){
			send(email)
			.then(()=>{
				resolve({
					email:email,
					retries:retries
				})
			})
		}
		else{
			retries++;
			delay = delay * 2	
			setTimeout(()=>{
				console.log("delay"+ delay)
		return 	providerOne(email,retries,delay).then(resolve).catch(reject)

		},delay)
		}
	})

}

function send(email:string):Promise<boolean>{
	return new Promise((resolve , reject)=>{
	sentArr.push(email)
	resolve(true)
	})
}


function providerTwo(email:string,retries:number,delay:number){
	return new Promise((resolve,reject)=>{
		if(retries >= 3){
			reject({email:email,retries:retries})
		}
		const arr = ["user3@example.com","user4@example.com"]
		if(arr.includes(email)){
			send(email)
			.then(()=>{
				resolve({
					email:email,
					retries:retries
				})
			})
		}
		else{
			retries++;
			delay = delay * 2
			setTimeout(()=>{
				console.log("delay"+delay)
			return	providerTwo(email,retries,delay).then(resolve).catch(reject)
			},delay)
		}
	})

}



export function sendMail(email:string){
	return new Promise((resolve , reject )=>{
			providerOne(email,0,delay)
			.then((data)=>{
				resolve({provider:"providerOne",retries:data.retries})
			})
			.catch((err)=>{
				providerTwo(email,0,delay)
				.then((data)=>{
					resolve({provider:"providerTwo" , retries:data.retries+3})
				})
				.catch(()=>{
					reject("cannot send: Email not registered")
				})
			})	

	})
	
	

}
