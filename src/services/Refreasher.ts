import axios from 'axios';

export enum TTokensKits {
  cityImages = 'cityImages'
}


export type STokensKitInfo = {
  id: string,
  name: string,
  tokensQuantity: string,
  activeId: string,
}

export type SToken = {
  id: string,
  token: string,
  status: boolean,
}

type TRefreasherItems = [Array<SToken>, STokensKitInfo];

const TokensKitsInfoIds = {
  [TTokensKits.cityImages]: 1,
};

const mokapi = 'https://63107679826b98071a4201be.mockapi.io/';

const MockApiRoutes = {
  tokens: {
    [TTokensKits.cityImages]: `${mokapi}SearchImageTokens/`,
  },
  tokensKitsInfo: `${mokapi}TokensKitsInfo/`,
};


export const generateNextActiveTokenId = (prevId: number, tokensQuantity: number) => {
  const nextIndex = prevId;

  if (tokensQuantity <= nextIndex) {
    return nextIndex - tokensQuantity;
  } else {
    return nextIndex + 1;
  }
};

export const refreasher = async (kit: TTokensKits, exceeded?: TRefreasherItems): Promise<TRefreasherItems> => {
  if (exceeded) {
    try {
      const [tokens, oldTokensKitInfo] = exceeded;
      const tokensQuantity = oldTokensKitInfo.tokensQuantity;

      const newTokensKitInfo: STokensKitInfo = {
        name: oldTokensKitInfo.name,
        id: oldTokensKitInfo.id,
        tokensQuantity: oldTokensKitInfo.tokensQuantity,
        activeId: String(generateNextActiveTokenId(+oldTokensKitInfo.activeId, +tokensQuantity)),
      };
      const newTokens = tokens.map((token) => {
        if (token.id === oldTokensKitInfo.activeId) {
          token.status = false;
        }
        if (token.id === newTokensKitInfo.activeId) {
          token.status = true;
        }
      });

      axios.put(MockApiRoutes.tokens[kit], newTokens);
      axios.put(MockApiRoutes.tokensKitsInfo + TokensKitsInfoIds[kit], newTokensKitInfo);


      console.log(tokens, newTokensKitInfo);

      return [tokens, newTokensKitInfo];

    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const { data: tokens } = await axios.get<SToken[]>(MockApiRoutes.tokens[kit]);
      const { data: tokensKitInfo } = await axios.get<STokensKitInfo>(MockApiRoutes.tokensKitsInfo + TokensKitsInfoIds[kit]);
      console.log(tokens, tokensKitInfo, 'Рефрешер');

      return [tokens, tokensKitInfo];
    } catch (error) {
      console.log(error);
    }
  }


  const mockToken: SToken = {
    id: '1',
    token: 'none',
    status: false,
  };

  const mockRefreasherItems: TRefreasherItems = [
    [mockToken],
    {
      id: String(TokensKitsInfoIds[kit]),
      activeId: '1',
      name: kit,
      tokensQuantity: '1',
    }
  ];
  return mockRefreasherItems;


};
