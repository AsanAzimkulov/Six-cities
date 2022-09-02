import axios from 'axios';

export enum TTokensKits {
  cityImages = 'cityImages'
}

export const TokensKitsUpdateTime = {
  [TTokensKits.cityImages]: 9,
} as {
    [key in TTokensKits]: number
  };

export const TokensKitsInfoUpdated = 'updated';


export type STokensKitInfo = {
  id: string,
  name: string,
  willUpdateAt: string,
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


function getNextUpdateTime(kit: TTokensKits, oldWillUpdateAt: string): number {
  const UTCUpdateHover = TokensKitsUpdateTime[kit];
  const now = new Date();
  const oldWillUpdateAtDate = new Date(+oldWillUpdateAt);

  if (now.getTime() < oldWillUpdateAtDate.getTime()) {
    return +oldWillUpdateAt;
  }
  return now.setUTCHours(UTCUpdateHover);
}

export const refreasher = async (kit: TTokensKits, exceeded?: TRefreasherItems, isExceeded?: boolean): Promise<TRefreasherItems> => {
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
      willUpdateAt: TokensKitsInfoUpdated,
    }
  ];

  if (exceeded) {
    if (isExceeded) {
      const [tokens, oldTokensKitInfo] = exceeded;

      const newTokensKitInfo: STokensKitInfo = {
        name: oldTokensKitInfo.name,
        id: oldTokensKitInfo.id,
        tokensQuantity: oldTokensKitInfo.tokensQuantity,
        willUpdateAt: String(getNextUpdateTime(kit, oldTokensKitInfo.willUpdateAt)),
        activeId: '1',
      };

      const newTokens = tokens.map((token) => {
        token.status = true;
      });

      axios.put(MockApiRoutes.tokensKitsInfo + TokensKitsInfoIds[kit], newTokensKitInfo);
      axios.put(MockApiRoutes.tokens[kit], newTokens);
      mockRefreasherItems[1].willUpdateAt = '';
      return mockRefreasherItems;
    }
    try {
      const [tokens, oldTokensKitInfo] = exceeded;
      const tokensQuantity = oldTokensKitInfo.tokensQuantity;

      const newTokensKitInfo: STokensKitInfo = {
        name: oldTokensKitInfo.name,
        id: oldTokensKitInfo.id,
        tokensQuantity: oldTokensKitInfo.tokensQuantity,
        willUpdateAt: TokensKitsInfoUpdated,
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
      const p1 = axios.get<SToken[]>(MockApiRoutes.tokens[kit]);
      const p2 = axios.get<STokensKitInfo>(MockApiRoutes.tokensKitsInfo + TokensKitsInfoIds[kit]);

      let tokens: SToken[] = [mockToken];
      let tokensKitInfo: STokensKitInfo = mockRefreasherItems[1];

      await Promise.all([p1, p2]).then((values) => {
        [{ data: tokens }, { data: tokensKitInfo }] = values;
      });

      console.log(tokens, tokensKitInfo, 'Рефрешер');

      if (tokensKitInfo.willUpdateAt !== TokensKitsInfoUpdated) {
        return mockRefreasherItems;
      }

      return [tokens, tokensKitInfo];
    } catch (error) {
      console.log(error);
    }
  }


  return mockRefreasherItems;


};
