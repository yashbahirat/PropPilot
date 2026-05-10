import { Prisma } from '@prisma/client';
import CopyCodeButton from '../CopyCodeButton';

type FirmWithRelations = Prisma.FirmGetPayload<{
  include: {
    offers: true;
    reviews: true;
    faqs: true;
  };
}>;

interface PricingTabProps {
  firm: FirmWithRelations;
}

export default function PricingTab({ firm }: PricingTabProps) {
  const activeOffers = firm.offers.filter((o) => o.isActive);
  const baseFee = firm.challengeFee ? parseFloat(firm.challengeFee.toString()) : null;

  return (
    <div className="space-y-6">
      {/* Challenge Fee */}
      <div className="bg-[#1E1E30] rounded-lg border border-[#2E2E45] p-6">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Challenge Fee
        </h2>
        {baseFee != null ? (
          <div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-semibold text-white">
                ${baseFee.toFixed(2)}
              </span>
              {firm.minAccountSize && (
                <span className="text-sm text-muted-foreground">
                  for ${firm.minAccountSize.toLocaleString()} account
                </span>
              )}
            </div>
            {activeOffers.length > 0 && (
              <div className="mt-2">
                {activeOffers.map((offer) => {
                  const discount = offer.discountPercent
                    ? baseFee * (offer.discountPercent / 100)
                    : offer.discountAmount
                    ? parseFloat(offer.discountAmount.toString())
                    : 0;
                  const trueCost = baseFee - discount;
                  return (
                    <div key={offer.id} className="mt-3 p-3 rounded-md bg-[#00D4AA]/5 border border-[#00D4AA]/20">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm text-muted-foreground line-through">${baseFee.toFixed(2)}</span>
                        <span className="text-xl font-semibold text-[#00D4AA]">${trueCost.toFixed(2)}</span>
                        {offer.discountPercent && (
                          <span className="text-xs font-semibold text-[#00D4AA] bg-[#00D4AA]/15 px-2 py-0.5 rounded">
                            {offer.discountPercent}% OFF
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">True cost with best available discount</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Fee information not available. Check the firm&apos;s website.</p>
        )}
      </div>

      {/* Discount Codes */}
      {activeOffers.length > 0 && (
        <div className="bg-[#1E1E30] rounded-lg border border-[#2E2E45] p-6">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Available Discount Codes
          </h2>
          <div className="space-y-4">
            {activeOffers.map((offer) => (
              <div key={offer.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg bg-[#08080F] border border-[#2E2E45]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-sm font-semibold text-[#00D4AA] tracking-wider">
                      {offer.code}
                    </span>
                    {offer.isExclusive && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#00D4AA]/15 text-[#00D4AA] border border-[#00D4AA]/30">
                        EXCLUSIVE
                      </span>
                    )}
                  </div>
                  {offer.description && (
                    <p className="text-xs text-muted-foreground">{offer.description}</p>
                  )}
                  {offer.discountPercent && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Saves {offer.discountPercent}% on challenge fee
                    </p>
                  )}
                  {offer.expiresAt && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Expires: {new Date(offer.expiresAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <CopyCodeButton code={offer.code} />
              </div>
            ))}
          </div>
        </div>
      )}

      {activeOffers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-base font-semibold text-white mb-1">No discount codes available</p>
          <p className="text-sm text-muted-foreground">Check back soon — new deals are added regularly.</p>
        </div>
      )}
    </div>
  );
}
