<script setup>
import Head1 from '@/shared/components/atoms/typography/Head1.vue';
import Head2 from '@/shared/components/atoms/typography/Head2.vue';
import Head3 from '@/shared/components/atoms/typography/Head3.vue';
import Subtitle1 from '@/shared/components/atoms/typography/Subtitle1.vue';
import Subtitle2 from '@/shared/components/atoms/typography/Subtitle2.vue';
import Subtitle3 from '@/shared/components/atoms/typography/Subtitle3.vue';
import P1 from '@/shared/components/atoms/typography/P1.vue';
import P2 from '@/shared/components/atoms/typography/P2.vue';
import Caption1 from '@/shared/components/atoms/typography/Caption1.vue';
import Caption2 from '@/shared/components/atoms/typography/Caption2.vue';

import MainActiveButton from '@/shared/components/atoms/button/MainActiveButton.vue';
import MainDisabledButton from '@/shared/components/atoms/button/MainDisabledButton.vue';
import SubDarkButton from '@/shared/components/atoms/button/SubDarkButton.vue';
import SubDisabledButton from '@/shared/components/atoms/button/SubDisabledButton.vue';
import SubLightButton from '@/shared/components/atoms/button/SubLightButton.vue';
import SmallDarkButton from '@/shared/components/atoms/button/SmallDarkButton.vue';
import SmallDisabledButton from '@/shared/components/atoms/button/SmallDisabledButton.vue';
import SmallLightButton from '@/shared/components/atoms/button/SmallLightButton.vue';
</script>

<template>
  <div>
    <Head1>Head1입니다</Head1>
    <Head2>Head2입니다</Head2>
    <Head3>Head3입니다</Head3>
    <Subtitle1>Subtitle1입니다</Subtitle1>
    <Subtitle2>Subtitle2입니다</Subtitle2>
    <Subtitle3>Subtitle3입니다</Subtitle3>
    <P1>P1입니다</P1>
    <P2>P2입니다</P2>
    <Caption1>Caption1 입니다.</Caption1>
    <Caption2>Caption2 입니다.</Caption2>

    <br /><br />

    <MainActiveButton>완료</MainActiveButton>
    <br />
    <MainDisabledButton>완료</MainDisabledButton>
    <br /><br />

    <SubLightButton>확인</SubLightButton>
    <br />
    <SubDarkButton>확인</SubDarkButton>
    <br />
    <SubDisabledButton>확인</SubDisabledButton>
    <br /><br />

    <SmallDarkButton>확인</SmallDarkButton>
    <SmallLightButton>확인</SmallLightButton>
    <SmallDisabledButton>확인</SmallDisabledButton>
  </div>
</template>
