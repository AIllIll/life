#!/bin/bash

# 驼峰转化
PARA=$1
arr=(`echo $PARA | tr '-' ' '`) 
result=''
for var in ${arr[@]}
do
     firstLetter=`echo ${var:0:1} | awk '{print toupper($0)}'`
     otherLetter=${var:1}
     result=$result$firstLetter$otherLetter
done
# 这两行是首字母小写
# firstResult=$(echo ${result:0:1} | tr '[A-Z]' '[a-z]')
# camelName=$firstResult${result:1}
camelName=$result


# 修改types/index.tsx
importLine="import ${camelName}Screen from '../screens/test/${1}-screen';"
awk -v "line=$importLine" '/^\s*$/ && !x {print line; x=1} 1' ../src/tabs/home-tab.tsx > temp_file && mv temp_file ../src/tabs/home-tab.tsx # awk似乎直接修改文件
sed -i "/<Drawer.Navigator>/ a\            <Drawer.Screen name=\"$1\" component={${camelName}Screen} />" ../src/tabs/home-tab.tsx

# 修改tabs/home-tab.tsx


sed -i "/type HomeDrawerParamList = {/ a\    '$1': undefined;" ../src/types/index.ts

# 创建screen文件
mkdir ../src/screens/test/$1-screen
touch ../src/screens/test/$1-screen/index.tsx
echo -e "import React from 'react';\n\
import { HomeDrawerParamList } from '../../../types';\n\
import { DrawerScreenProps } from '@react-navigation/drawer';\n\
import { View } from 'react-native';\n\
\n\
const ${camelName}Screen = ({\n\
    navigation,\n\
    route,\n\
}: DrawerScreenProps<HomeDrawerParamList, '${1}'>): JSX.Element => {\n\
    return <View></View>;\n\
};\n\
export default ${camelName}Screen;\n\
" > ../src/screens/test/$1-screen/index.tsx