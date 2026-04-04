import { prisma } from '../prisma';
import { type Job, type Task } from '~/generated/client';

const taskSeed = async (jobs: Job[]): Promise<Task[]> => {
    const [google, stripe, nTwentySix] = jobs;
    const tasksData = [
        {
            jobId: stripe.id,
            title: 'Send follow-up email',
            description:
                'Email Anna Müller about application status — it has been 5 days.',
            completed: false,
            dueDate: '2026-06-14',
        },
        {
            jobId: stripe.id,
            title: 'Prepare Stripe payments infra questions',
            description:
                'Research Stripes tech stack and prepare questions about the payments infra team.',
            completed: false,
            dueDate: '2026-06-12',
        },
        {
            jobId: nTwentySix.id,
            title: 'Prepare system design notes',
            description:
                'Review distributed systems and mobile architecture concepts before technical interview.',
            completed: false,
            dueDate: '2026-06-10',
        },
        {
            jobId: nTwentySix.id,
            title: 'Research Delivery Hero tech stack',
            description:
                'Check their engineering blog and GitHub to understand their RN setup.',
            completed: true,
            dueDate: '2026-06-14',
        },
        {
            jobId: google.id,
            title: 'Tailor resume to Google JD',
            description:
                'Highlight TypeScript, performance optimization and large-scale frontend experience.',
            completed: true,
            dueDate: '2026-06-14',
        },
        {
            jobId: google.id,
            title: 'Update portfolio with recent projects',
            description:
                'Add the design system and the open-source contributions from Q1.',
            completed: false,
            dueDate: '2026-06-20',
        },
    ];

    return Promise.all(
        tasksData.map((task) => prisma.task.create({ data: task })),
    );
};

export { taskSeed };
