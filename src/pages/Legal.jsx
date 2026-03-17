import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, Cookie, Eye } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const TABS = [
    { id: 'privacy', icon: Shield },
    { id: 'cookies', icon: Cookie },
    { id: 'transparency', icon: Eye },
];

const Legal = () => {
    const { t } = useTranslation();
    const [active, setActive] = useState('privacy');

    useEffect(() => {
        const hash = window.location.hash.replace('#', '');
        if (TABS.some(tab => tab.id === hash)) setActive(hash);
    }, []);

    const switchTab = (id) => {
        setActive(id);
        window.history.replaceState(null, '', `#${id}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="py-16 md:py-24">
            <SEOHead title={t('legal.seo_title')} description={t('legal.seo_description')} path="/legal" />
            <div className="max-w-3xl mx-auto px-6">

                <h1 className="text-4xl md:text-5xl font-bold text-brand-headline text-center mb-12 tracking-tight">
                    {t('legal.title')}
                </h1>

                {/* Tabs */}
                <div className="flex gap-2 mb-12 border-b border-slate-200">
                    {TABS.map(({ id, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => switchTab(id)}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-colors border-b-2 -mb-px ${
                                active === id
                                    ? 'border-brand-secondary text-brand-secondary'
                                    : 'border-transparent text-slate-400 hover:text-slate-600'
                            }`}
                        >
                            <Icon className="w-4 h-4" />
                            {t(`legal.tab_${id}`)}
                        </button>
                    ))}
                </div>

                {/* Privacy */}
                {active === 'privacy' && (
                    <div className="space-y-8 text-slate-600 text-[15px] leading-relaxed animate-fade-in-up">
                        <Section title={t('legal.privacy_controller_title')}>
                            <p>{t('legal.privacy_controller_text')}</p>
                        </Section>
                        <Section title={t('legal.privacy_data_title')}>
                            <p>{t('legal.privacy_data_text')}</p>
                        </Section>
                        <Section title={t('legal.privacy_purpose_title')}>
                            <p>{t('legal.privacy_purpose_text')}</p>
                        </Section>
                        <Section title={t('legal.privacy_legal_basis_title')}>
                            <p>{t('legal.privacy_legal_basis_text')}</p>
                        </Section>
                        <Section title={t('legal.privacy_retention_title')}>
                            <p>{t('legal.privacy_retention_text')}</p>
                        </Section>
                        <Section title={t('legal.privacy_minors_title')}>
                            <p>{t('legal.privacy_minors_text')}</p>
                        </Section>
                        <Section title={t('legal.privacy_rights_title')}>
                            <p>{t('legal.privacy_rights_text')}</p>
                        </Section>
                        <div className="mt-8 p-4 bg-slate-50 rounded-xl text-xs text-slate-400 border border-slate-100">
                            {t('legal.eu_disclaimer')}
                        </div>
                    </div>
                )}

                {/* Cookies */}
                {active === 'cookies' && (
                    <div className="space-y-8 text-slate-600 text-[15px] leading-relaxed animate-fade-in-up">
                        <Section title={t('legal.cookies_what_title')}>
                            <p>{t('legal.cookies_what_text')}</p>
                        </Section>
                        <Section title={t('legal.cookies_types_title')}>
                            <p>{t('legal.cookies_types_text')}</p>
                        </Section>
                        <Section title={t('legal.cookies_analytics_title')}>
                            <p>{t('legal.cookies_analytics_text')}</p>
                        </Section>
                        <Section title={t('legal.cookies_manage_title')}>
                            <p>{t('legal.cookies_manage_text')}</p>
                        </Section>
                    </div>
                )}

                {/* Transparency */}
                {active === 'transparency' && (
                    <div className="space-y-8 text-slate-600 text-[15px] leading-relaxed animate-fade-in-up">
                        <Section title={t('legal.trans_project_title')}>
                            <InfoRow label={t('legal.trans_programme')} value="Erasmus+ KA220-VET" />
                            <InfoRow label={t('legal.trans_funder')} value={t('legal.trans_funder_value')} />
                            <InfoRow label={t('legal.trans_agency')} value="SEPIE (Spain)" />
                            <InfoRow label={t('legal.trans_coordinator')} value="FVEM — Federación Vizcaína de Empresas del Metal" />
                            <InfoRow label={t('legal.trans_duration')} value="24 months (2025–2027)" />
                            <InfoRow label={t('legal.trans_partners_label')} value="6 organisations — Spain, Italy, Austria, Slovakia, Portugal" />
                        </Section>
                        <div className="mt-8 p-4 bg-slate-50 rounded-xl text-xs text-slate-400 border border-slate-100">
                            {t('legal.eu_disclaimer')}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

const Section = ({ title, children }) => (
    <section>
        <h2 className="text-base font-bold text-brand-primary mb-3">{title}</h2>
        {children}
    </section>
);

const InfoRow = ({ label, value }) => (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 py-3 border-b border-slate-100 last:border-0">
        <span className="sm:w-40 text-xs font-semibold text-slate-400 uppercase tracking-wide flex-shrink-0">{label}</span>
        <span className="text-slate-700">{value}</span>
    </div>
);

export default Legal;
