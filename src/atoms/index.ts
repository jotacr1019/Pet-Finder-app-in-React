import { atom } from "recoil";
import { useRecoilValue, useRecoilState } from "recoil";

export const btnPasswordDisabledState = atom({
    key: "btnPasswordDisabledState",
    default: false,
});

export const useBtnPasswordDisabledState = () =>
    useRecoilState(btnPasswordDisabledState);

export const btnDataDisabledState = atom({
    key: "btnDataDisabledState",
    default: false,
});

export const useBtnDataDisabledState = () =>
    useRecoilState(btnDataDisabledState);

export const backdropFilterState = atom({
    key: "backdropFilterState",
    default: "none",
});

export const useBackdropFilterState = () => useRecoilState(backdropFilterState);

const imagesAtom = atom({
    key: "images",
    default: [],
});

export const useImagesUrl = () => useRecoilState(imagesAtom);

const locationNameAtom = atom({
    key: "locationName",
    default: "",
});

export const useLocationName = () => useRecoilState(locationNameAtom);
