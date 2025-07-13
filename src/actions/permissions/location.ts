//Solicitar y revisar permisos - Request Permissions 


import { openSettings, PERMISSIONS, PermissionStatus as RNPermissionStatus, request, check } from "react-native-permissions"
import type { PermissionStatus } from "../../infrastructure/permissions"
import { Platform } from "react-native";

// la solicitud de permisos no es sincrono es asyncrono necesitas varrias acciones para ser ejecutada.


export const requestLocationPermission = async ():Promise<PermissionStatus> => {
    let status : RNPermissionStatus = 'unavailable';

    if (Platform.OS === 'ios') {
        status = await request (PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    }else if (Platform.OS === 'android') {
        status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }else {
        throw new Error('Unsupported platform');
    }

    if (status === 'blocked') {
        await openSettings();
        
        //
    }

    const permissionMapper: Record<RNPermissionStatus, PermissionStatus> = {

        unavailable: 'unavailable',
        denied: 'denied',
        blocked: 'blocked',
        granted: 'granted',
        limited: 'limited',
           
    }

    return permissionMapper[status] ?? 'unavailable';
}



//revisarr permisis de ubicacion 


export const checkLocationPermission = async (): Promise<PermissionStatus> => {
    let status: RNPermissionStatus = 'unavailable';

    if (Platform.OS === 'ios') {
        status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else if (Platform.OS === 'android') {
        status = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    } else {
        throw new Error('Unsupported platform');
    }

    const permissionMapper: Record<RNPermissionStatus, PermissionStatus> = {
        unavailable: 'unavailable',
        denied: 'denied',
        blocked: 'blocked',
        granted: 'granted',
        limited: 'limited',
    };

    return permissionMapper[status] ?? 'unavailable';
}