export const getSigunguList = async (keyword: string) => {
  const url = `/vworld/req/data?attrFilter=sig_kor_nm:like:${keyword}&geometry=false&data=LT_C_ADSIGG_INFO&request=GetFeature&key=069702E3-D907-3290-8F9E-12C5B4249082&domain=www.frameit.kr`;

  const res = await fetch(url);

  const data = await res.json();

  return {
    page: data.response.page,
    record: data.response.record,
    features: data.response.result?.featureCollection.features ?? [],
  };
};
