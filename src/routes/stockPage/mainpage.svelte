<!-- 
    物件-沙漠+仙人掌+1.jpeg
    Main-Type+Name+Pid
    构筑新表
    1 按Main,Type,Name,Pid排序
    2 第0行复制Main,Type,Name=NULL
    3 第n行Type!=第n+1行，且n行name!=NULL，n行后插入复制n+1行，数据name为NULL
-->

<!-- 一级：选择类型：关卡-物件-其他 -->
<!-- 有限类别，分别构筑三个表，限制关键字提取 -->



<!-- 二级：再出现小分类，下有预览图，统一切成4:3比例 -->
<!-- 无限分类，只能有一个表
     数据库先检索分类，然后根据分类检索item，需要在SQL中构建新表 -->
<div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
    {#each testPic as item}
        <a href="/">
            <div class="grid grid-cols-1 bg-zinc-600 hover:opacity-50 overflow-hidden">
                <img src={item} alt=""/>
                <span class="text-center">123</span>
            </div>
        </a>
    {/each}
</div>

<!-- 三级：点开看大图 -->
<script>
    let testPic = [
        "/stockPageImg/skywardSword/1+火山+POI.jpg",
        "/stockPageImg/skywardSword/1+火山+POI (2).jpg",
        "/stockPageImg/skywardSword/1+火山+POI (3).jpg",
        "/stockPageImg/skywardSword/1+火山+POI (4).jpg",
    ]
</script>