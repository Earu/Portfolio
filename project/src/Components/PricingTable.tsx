import { useTranslation } from "react-i18next";
import "./PricingTable.css";

type PackageKey = "READINESS" | "PILOT" | "DEPLOYMENT";

export default function PricingTable(): JSX.Element {
  const { t } = useTranslation();

  const packages: PackageKey[] = ["READINESS", "PILOT", "DEPLOYMENT"];

  return (
    <div className="pricing-table">
      <div className="pricing-table-header">
        <div className="pricing-table-title">{t("PRICING.TITLE")}</div>
        <div className="pricing-table-disclaimer">{t("PRICING.DISCLAIMER")}</div>
      </div>

      <div className="pricing-table-grid">
        {packages.map((key, idx) => (
          <div key={key} className={`pricing-table-col header col col-${idx + 1}`}>
            <div className="pkg-name">{t(`PRICING.PACKAGES.${key}.NAME`)}</div>
          </div>
        ))}

        {packages.map((key, idx) => (
          <div key={`${key}-price`} className={`pricing-table-cell price col col-${idx + 1}`}>
            <div className="cell-inner">
              <div className="cell-label">{t("PRICING.ROW_LABELS.PRICE")}</div>
              <div className="cell-value">{t(`PRICING.PACKAGES.${key}.PRICE`)}</div>
            </div>
          </div>
        ))}

        {packages.map((key, idx) => (
          <div key={`${key}-time`} className={`pricing-table-cell timeframe col col-${idx + 1}`}>
            <div className="cell-inner">
              <div className="cell-label">{t("PRICING.ROW_LABELS.TIMEFRAME")}</div>
              <div className="cell-value">{t(`PRICING.PACKAGES.${key}.TIMEFRAME`)}</div>
            </div>
          </div>
        ))}

        {packages.map((key, idx) => (
          <div key={`${key}-desc`} className={`pricing-table-cell description col col-${idx + 1}`}>
            <div className="cell-inner">
              <div className="cell-label">{t("PRICING.ROW_LABELS.DESCRIPTION")}</div>
              <div className="cell-value">{t(`PRICING.PACKAGES.${key}.DESCRIPTION`)}</div>
            </div>
          </div>
        ))}

        {packages.map((key, idx) => (
          <div key={`${key}-cta`} className={`pricing-table-cell cta-cell col col-${idx + 1}`}>
            <a href="#schedule" className="pricing-cta">{t(`PRICING.CTA_PACKAGE.${key}`, { defaultValue: t("PRICING.CTA_LABEL") as string })}</a>
          </div>
        ))}
      </div>

      {/* Mobile/Tablet cards */}
      <div className="pricing-cards">
        {packages.map((key, idx) => (
          <div key={`card-${key}`} className={`pricing-card col-${idx + 1}`}>
            <div className="pricing-card-header">
              <div className="pkg-name">{t(`PRICING.PACKAGES.${key}.NAME`)}</div>
            </div>
            <div className="pricing-card-row price">
              <div className="cell-label">{t("PRICING.ROW_LABELS.PRICE")}</div>
              <div className="cell-value">{t(`PRICING.PACKAGES.${key}.PRICE`)}</div>
            </div>
            <div className="pricing-card-row timeframe">
              <div className="cell-label">{t("PRICING.ROW_LABELS.TIMEFRAME")}</div>
              <div className="cell-value">{t(`PRICING.PACKAGES.${key}.TIMEFRAME`)}</div>
            </div>
            <div className="pricing-card-row description">
              <div className="cell-label">{t("PRICING.ROW_LABELS.DESCRIPTION")}</div>
              <div className="cell-value">{t(`PRICING.PACKAGES.${key}.DESCRIPTION`)}</div>
            </div>
            <div className="pricing-card-row cta-cell">
              <a href="#schedule" className="pricing-cta">{t(`PRICING.CTA_PACKAGE.${key}`, { defaultValue: t("PRICING.CTA_LABEL") as string })}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


