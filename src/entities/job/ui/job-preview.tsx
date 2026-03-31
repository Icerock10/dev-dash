import { Modal, Button } from '~/shared/ui/components/components';
import { type JobDto } from '../model/libs/types/types';
import { getClassNames } from '~/shared/libs/helpers/helpers';
import { JobStatusBadge } from '~/features/job/ui/job-status-badge';
import { JobTag } from './job-tag';
import { ButtonVariant } from '~/shared/libs/enums/enums';

type Properties = {
    isModalOpen: boolean;
    togglePreviewModal: () => void;
    job: JobDto;
    logo: React.ReactNode;
    statusBadges: string[];
};

const JobPreview: React.FC<Properties> = ({
    isModalOpen,
    togglePreviewModal,
    job,
    logo,
    statusBadges,
}) => {
    const jobInfo = {
        LOCATION: job.location,
        SALARY: `€${job.salaryRange ?? ''}k`,
        RECRUITER: job.recruiterName,
    };

    return (
        <Modal
            title={job.title}
            subTitle={`${job.company} · ${String(job.location)}`}
            onClose={togglePreviewModal}
            isOpen={isModalOpen}
            logo={logo}
        >
            <div className="flex flex-col gap-5 px-6 py-5 font-mono">
                <div className="grid grid-cols-3 gap-3">
                    {Object.entries(jobInfo).map(([label, value]) => (
                        <div
                            key={label}
                            className="rounded-xl border border-[#1e2a45] bg-[#0c1020] p-3"
                        >
                            <p className="mb-1.5 text-[10px] tracking-wide text-slate-500 uppercase">
                                {label}
                            </p>
                            <p
                                className={getClassNames(
                                    'text-sm font-medium',
                                    label === 'SALARY'
                                        ? 'text-emerald-400'
                                        : 'text-white',
                                )}
                            >
                                {value}
                            </p>
                        </div>
                    ))}
                </div>
                <div>
                    <h1 className="mb-2.5 text-xs tracking-wide text-slate-500 uppercase">
                        Tags
                    </h1>
                    <div className="mt-2 mb-3 flex flex-wrap gap-1.5 font-mono">
                        {job.tags.map((tag) => (
                            <JobTag key={tag} label={tag} />
                        ))}
                    </div>
                </div>
                <div>
                    <h1 className="mb-2.5 text-xs tracking-wide text-slate-500 uppercase">
                        Notes
                    </h1>
                    <div className="max-h-44 overflow-y-auto rounded-xl border border-[#1e2a45] bg-[#0c1020] p-4 text-sm leading-relaxed text-slate-300">
                        {job.notes === ''
                            ? 'There are no notes yet...'
                            : job.notes}
                    </div>
                </div>
                <div>
                    <h1 className="mb-2.5 text-xs tracking-wide text-slate-500 uppercase">
                        Status
                    </h1>
                    <div className="flex flex-wrap gap-2">
                        {statusBadges.map((badge) => (
                            <JobStatusBadge
                                onDomNodeClose={togglePreviewModal}
                                jobStatus={job.status}
                                key={badge}
                                jobStatusBadge={badge}
                                jobId={job.id}
                                variant="bordered"
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex gap-3 border-t border-[#1e2a45] bg-[#0c1020] px-6 py-4">
                <Button label="Edit" variant={ButtonVariant.SECONDARY} />
                <Button
                    className="border-red-500/20 text-red-400! hover:bg-red-500/10!"
                    label="Delete"
                    variant={ButtonVariant.SECONDARY}
                />
            </div>
        </Modal>
    );
};

export { JobPreview };
