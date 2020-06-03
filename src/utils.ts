const datePattern = '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z';
const multiSageOcidPattern = '^ocds-([a-z]|[0-9]){6}-[A-Z]{2}-[0-9]{13}';
const planningNoticeOcidPattern = `${multiSageOcidPattern}-(PN)-[0-9]{13}`;
const contractNoticeOcidPattern = `${multiSageOcidPattern}-(EV|NP)-[0-9]{13}`;
const awardedContractOcidPattern = `${multiSageOcidPattern}-AC-[0-9]{13}`;

export const patterns = {
  date: new RegExp(datePattern),
  multiSageOcid: new RegExp(`${multiSageOcidPattern}$`),
  planningNoticeOcid: new RegExp(planningNoticeOcidPattern),
  contractNoticeOcid: new RegExp(contractNoticeOcidPattern),
  awardedContractOcid: new RegExp(awardedContractOcidPattern),
};
