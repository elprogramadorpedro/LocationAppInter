import { create } from "zustand";
import { Location } from "../../../infrastructure/interfaces/locations"
import { getCurrentLocation, clearWachLocation, watchCurrentLocation } from '../../../actions/location/location';



interface LocationState{
    lastKnownLocation:Location|null;
    userLocationsList:Location[];
    wachId: number | null;
    

    getLocation: () => Promise<Location | null>;
    watchLocation: () => void;
    clearWachLocation: ()=> void;

}

export const useLocationStore = create<LocationState>()((set, get)=>({

lastKnownLocation: null,
userLocationsList:[],
wachId: null,

getLocation: async () => {
    
        const location = await getCurrentLocation();
        set({ lastKnownLocation: location });
        return location;
},


watchLocation:()=>{
    const watchId= get().wachId;
    if(watchId!==null){
        get().clearWachLocation
    }

const id = watchCurrentLocation((location)=>{
    set({
        lastKnownLocation:location,
        userLocationsList: [...get().userLocationsList, location]
    })

});

set({wachId:id})

},

clearWachLocation:()=>{
const watchId= get().wachId;
if(watchId !== null){
    clearWachLocation(watchId)
}
    
}


}))

