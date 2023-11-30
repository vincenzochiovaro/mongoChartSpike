import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class CustomLoginService{

    constructor() {}

    async login(username="admin", password="password") {
        const rawResponse = await fetch("http://localhost:8000/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username: username, password: password })
        });
        const content = await rawResponse.json();
        return content.bearerToken;
        }

}