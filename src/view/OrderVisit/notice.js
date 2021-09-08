import React from "react";

const Notice = (props) => {
  const { noticeData, tabChange } = props;
  const jumpClick = () => {
    tabChange("order");
  };
  return (
    <div className="notice-style">
      <div className="content-notice">
        <li>{noticeData.description}</li>
        {/* <li>
          1、观众要严格遵守国家法律法规和本馆各项规章制度，严禁携带易燃、易爆、有毒有害等危险品及宠物进入展馆。1、观众要严格遵守国家法律法规和本馆各项规章制度，严禁携带易燃、易爆、有毒有害等危险品及宠物进入展馆。
        </li>
        <li>2、禁止在展馆内吸烟。</li>
        <li>
          3、爱护公物，不在文物、展品上涂刻，不随意触摸展柜和其它物品，不在展厅内乱涂乱抹、乱贴乱画。不随
        </li>
        <li>
          4、保持馆内清洁、卫生。请勿携带有色饮料进入展厅，禁止随地吐痰、乱扔果皮纸屑。
        </li>
        <li>5、保持馆内安静，禁止随意走动，追逐打闹，推搡拥挤、大声喧哗。</li>
        <li>6、未经管理人员许可不得对藏品进行拍摄或照相。</li>
        <li>7、个人参观需答疑时，请与展馆管理人员联系解决。</li>
        <li>
          8、小心玻璃、注意安全。请勿爬靠或挤压玻璃展柜，以防玻璃破裂，造成藏品损坏和伤及身体。
        </li>
        <li>9、请保持衣着整洁得体，男士身着无袖背心、拖鞋者不能入内。</li>
        <li>
          10、未成年人参观需由家长带领，以确保参观安全；老年、行动不便及身患疾病的观众请在保证个人安全的
        </li> */}
      </div>
      <div className="know-btn" onClick={jumpClick}>
        参观预约
      </div>
    </div>
  );
};
export default Notice;
