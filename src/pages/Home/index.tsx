import React from "react";
import { usePetsFound } from "../../hooks/petsAround";

export function Home(){

    const [petsFound, setPetsFound] = usePetsFound();

    return  <div>
                <h1>Home</h1>
                <p>{JSON.stringify(petsFound)}</p>
            </div>
}