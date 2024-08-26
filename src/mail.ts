import {providerOneEmails} from './providerOneEmails';
import {providerTwoEmails} from './providerTwoEmails'


export let sentArr: string[] = [];
let delay = 100;
export const statusTracker: { [email: string]: { provider: string; retries: number; status: string } } = {};
function providerOne(email: string, retries: number, delay: number): Promise<{ email: string; retries: number }> {
    return new Promise((resolve, reject) => {
        if (retries > 3) {
            statusTracker[email] = {
                provider: "providerOne",
                retries: retries,
                status: "failed"
            };
            console.log(`providerOne failed: ${JSON.stringify(statusTracker)}`);
            reject({ email: email, retries: retries });
            return;
        }

        // testing const arr = ['user@example.com', 'user2@example.com'];
        if (providerOneEmails.includes(email)) {
            send(email)
                .then(() => {
                    statusTracker[email] = {
                        provider: "providerOne",
                        retries: retries,
                        status: "sent"
                    };
                    console.log(`providerOne sent: ${JSON.stringify(statusTracker)}`);
                    resolve({ email: email, retries: retries });
                });
        } else {
            retries++;
            delay = delay * 2;
            setTimeout(() => {
                providerOne(email, retries, delay).then(resolve).catch(reject);
            }, delay);
        }
    });
}
function send(email: string): Promise<boolean> {
    return new Promise((resolve) => {
        sentArr.push(email);
        console.log(`Email sent: ${email}`);
        resolve(true);
    });
}

function providerTwo(email: string, retries: number, delay: number): Promise<{ email: string; retries: number }> {
    return new Promise((resolve, reject) => {
        if (retries >= 6) {
            statusTracker[email] = {
                provider: "providerTwo",
                retries: retries,
                status: "failed"
            };
            console.log(`providerTwo failed: ${JSON.stringify(statusTracker)}`);
            reject({ email: email, retries: retries });
	    return;
        }

     // testing   const arr = ["user3@example.com", "user4@example.com"];
        if (providerTwoEmails.includes(email)) {
            send(email)
                .then(() => {
                    statusTracker[email] = {
                        provider: "providerTwo",
                        retries: retries+3,
                        status: "sent"
                    };
                    console.log(`providerTwo sent: ${JSON.stringify(statusTracker)}`);
                    resolve({ email: email, retries: retries });
                });
        } else {
            retries++;
            delay = delay * 2;
            setTimeout(() => {
                console.log(`providerTwo retrying for ${email} with delay ${delay}`);
                providerTwo(email, retries, delay).then(resolve).catch(reject);
            }, delay);
        }
    });
}

export function sendMail(email: string): Promise<{ provider: string; retries: number }> {
    return new Promise((resolve, reject) => {
        providerOne(email, 0, delay)
            .then(data => {
                console.log(`providerOne successful: ${JSON.stringify(statusTracker)}`);
                resolve({ provider: "providerOne", retries: data.retries });
            })
            .catch(() => {
                providerTwo(email, 0, delay)
                    .then(data => {
                        console.log(`providerTwo successful: ${JSON.stringify(statusTracker)}`);
                        resolve({ provider: "providerTwo", retries: data.retries + 3 });
                    })
                    .catch(() => {
                        statusTracker[email] = {
                            provider: "none",
                            retries: -1,
                            status: "failed"
                        };
                        console.log(`providerTwo failed: ${JSON.stringify(statusTracker)}`);
                        reject({ provider: "none", retries: -1 });
                    });
            });
    });
}


