export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  Asset: undefined;
};

export type AssetStackParamList = {
  AssetList: undefined;
  AssetAdd: undefined;
  AssetDetails: { assetId: string };
  AssetEdit: { assetId: string };
};

// ---------------------------------------------------
export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  AssetList: undefined;
  AssetAdd?: {
    scannedUID?: string;
    sheetOpen?: 'scan' | 'nfc';
    sheetAllowed?: 'scan' | 'nfc';
    sheetMode?: 'ADD_ASSET' | 'EDIT_ASSET' | 'DEFAULT';
  };
  AssetDetails: { assetId: string };
  AssetEdit: { assetId: string };
};

export type ProfileStackParamList = {
  ProfileScreen: undefined;
};

export type TabParamList = {
  Home: undefined;
  Search?: {
    sheetOpen?: 'scan' | 'nfc';
    sheetAllowed?: ('scan' | 'nfc')[];
    sheetMode?: 'ADD_ASSET' | 'EDIT_ASSET' | 'DEFAULT';
  };
  Profile: undefined;
  Auth: undefined;
};
