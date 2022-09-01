import { refreasher, TTokensKits, generateNextActiveTokenId, SToken, STokensKitInfo } from './Refreasher';
import axios from 'axios';
import { AxiosRequestConfig } from 'axios';

type TImages = {
  total: number,
  value: [
    {
      url: string
    }
  ],
}

export enum RapidApiHttpCode {
  TokenExceeded = 429
}

// const ApiKeys = ['ffeab250aemsh25e633587fe3641p12f5ddjsn1882703ffb74', 'cd8dba169cmsha91acf9f8715accp18c5f9jsnf6999f73a4c0', 'c5a383307bmshaa9ff036d26d84ep139027jsn44da1a05d758', '3bcb9e6cabmsh4fb1640d75a2220p1dac5ejsn9cab7277f185'];

export const searchImages = async () => {
  let refreasherItems = await refreasher(TTokensKits.cityImages);

  let tokens = refreasherItems[0] as SToken[];
  let tokensKitInfo = refreasherItems[1] as STokensKitInfo;

  let activeToken = tokens[+tokensKitInfo.activeId - 1];
  console.log(activeToken);

  return async (query: string) => {

    let res;
    const options = {
      method: 'GET',
      url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI',
      params: { q: query, pageNumber: '1', pageSize: '49', autoCorrect: 'true' },
      headers: {
        'X-RapidAPI-Key': activeToken.token,
        'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
      }
    } as AxiosRequestConfig;

    try {
      await axios.request(options).then((response) => {
        res = response.data;
        console.log(res);
      }).catch((error) => {
        console.error(error);
      });
      return res as unknown as TImages;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === RapidApiHttpCode.TokenExceeded) {
          refreasherItems = await refreasher(TTokensKits.cityImages, refreasherItems);

          tokens = refreasherItems[0] as SToken[];
          tokensKitInfo = refreasherItems[1] as STokensKitInfo;

          activeToken = tokens[generateNextActiveTokenId(+tokensKitInfo.activeId, tokens.length) - 1];

          console.log(activeToken);
          // axios.request(options).then((response) => {
          //   res = response.data;
          //   console.log(res);
          // }).catch((err) => {
          //   console.error(err);
          // });
          return res as unknown as TImages;
        }
      }
    }
  };
};
