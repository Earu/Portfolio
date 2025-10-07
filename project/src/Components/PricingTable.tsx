import { useTranslation } from "react-i18next";
import "./PricingTable.css";

type PackageKey = "READINESS" | "PILOT" | "DEPLOYMENT";

export default function PricingTable({ meetingUrl }: { meetingUrl: string }): JSX.Element {
  const { t } = useTranslation();

  const packages: PackageKey[] = ["READINESS", "PILOT", "DEPLOYMENT"];

  function renderWithSmallNote(text: string): JSX.Element | string {
    const openIdx = text.indexOf("(");
    const closeIdx = text.lastIndexOf(")");
    if (openIdx !== -1 && closeIdx !== -1 && closeIdx > openIdx) {
      const main = text.substring(0, openIdx).trim();
      const note = text.substring(openIdx, closeIdx + 1);
      return (
        <>
          <span>{main}</span>
          <span className="small-note">* </span>
          <span className="small-note">{note}</span>
        </>
      );
    }
    return text;
  }

  function renderDeliverables(text: string): JSX.Element | string {
    const parts = text.split(";").map(p => p.trim()).filter(p => p.length > 0);
    if (parts.length >= 2) {
      return (
        <ul className="deliverables-list">
          {parts.map((item, i) => (
            <li key={i}>{item.replace(/[.;]$/g, "")}</li>
          ))}
        </ul>
      );
    }
    return text;
  }

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
              <div className="cell-label">{renderWithSmallNote(t("PRICING.ROW_LABELS.PRICE") as string)}</div>
              <div className="cell-value">{t(`PRICING.PACKAGES.${key}.PRICE`)}</div>
            </div>
          </div>
        ))}

        {packages.map((key, idx) => (
          <div key={`${key}-time`} className={`pricing-table-cell timeframe col col-${idx + 1}`}>
            <div className="cell-inner">
              <div className="cell-label">{t("PRICING.ROW_LABELS.TIMEFRAME")}</div>
              <div className="cell-value">{renderWithSmallNote(t(`PRICING.PACKAGES.${key}.TIMEFRAME`) as string)}</div>
            </div>
          </div>
        ))}

        {packages.map((key, idx) => (
          <div key={`${key}-obj`} className={`pricing-table-cell objective col col-${idx + 1}`}>
            <div className="cell-inner">
              <div className="cell-label">{t("PRICING.ROW_LABELS.OBJECTIVE")}</div>
              <div className="cell-value">{t(`PRICING.PACKAGES.${key}.OBJECTIVE`)}</div>
            </div>
          </div>
        ))}

        {packages.map((key, idx) => (
          <div key={`${key}-desc`} className={`pricing-table-cell description col col-${idx + 1}`}>
            <div className="cell-inner">
              <div className="cell-label">{t("PRICING.ROW_LABELS.DESCRIPTION")}</div>
              <div className="cell-value">{renderDeliverables(t(`PRICING.PACKAGES.${key}.DESCRIPTION`) as string)}</div>
            </div>
          </div>
        ))}

        {packages.map((key, idx) => (
          <div key={`${key}-cta`} className={`pricing-table-cell cta-cell col col-${idx + 1}`}>
            <a href={meetingUrl} target="_blank" className="pricing-cta">{t(`PRICING.CTA_PACKAGE.${key}`, { defaultValue: t("PRICING.CTA_LABEL") as string })}</a>
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
              <div className="cell-label">{renderWithSmallNote(t("PRICING.ROW_LABELS.PRICE") as string)}</div>
              <div className="cell-value">{t(`PRICING.PACKAGES.${key}.PRICE`)}</div>
            </div>
            <div className="pricing-card-row timeframe">
              <div className="cell-label">{t("PRICING.ROW_LABELS.TIMEFRAME")}</div>
              <div className="cell-value">{renderWithSmallNote(t(`PRICING.PACKAGES.${key}.TIMEFRAME`) as string)}</div>
            </div>
            <div className="pricing-card-row objective">
              <div className="cell-label">{t("PRICING.ROW_LABELS.OBJECTIVE")}</div>
              <div className="cell-value">{t(`PRICING.PACKAGES.${key}.OBJECTIVE`)}</div>
            </div>
            <div className="pricing-card-row description">
              <div className="cell-label">{t("PRICING.ROW_LABELS.DESCRIPTION")}</div>
              <div className="cell-value">{renderDeliverables(t(`PRICING.PACKAGES.${key}.DESCRIPTION`) as string)}</div>
            </div>
            <div className="pricing-card-row cta-cell">
              <a href={meetingUrl} target="_blank" className="pricing-cta">{t(`PRICING.CTA_PACKAGE.${key}`, { defaultValue: t("PRICING.CTA_LABEL") as string })}</a>
            </div>
          </div>
        ))}
      </div>

      <div className="pricing-table-footer">
        <span className="footer-note"><b>{t("PRICING.FOOTER_NOTE")}</b></span>
        &nbsp;
        <a href={meetingUrl} target="_blank" className="pricing-cta inline">{t("PRICING.CTA_LABEL")}</a>
      </div>
    </div>
  );
}


