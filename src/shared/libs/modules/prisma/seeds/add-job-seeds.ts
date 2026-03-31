import { prisma } from '../prisma';
import { type Job, JobStatus } from '~/generated/client';

const jobsData = [
    {
        company: 'Google',
        title: 'Senior Frontend Engineer',
        location: 'Remote',
        salaryRange: '90–120',
        tags: ['React', 'TypeScript', 'Remote'],
        recruiterName: 'Jake Dulham',
        status: JobStatus.SAVED,
        notes: 'Great team culture, fully remote position. Referral from a friend on the Chrome team.',
    },
    {
        company: 'Stripe',
        title: 'React Engineer',
        location: 'Berlin',
        salaryRange: '80–100',
        tags: ['React', 'Node.js', 'Berlin'],
        recruiterName: 'Anna Müller',
        status: JobStatus.APPLIED,
        notes: 'Applied via LinkedIn. Strong focus on payments infra and developer tooling.',
    },
    {
        company: 'N26',
        title: 'Full Stack Developer',
        location: 'Munich',
        salaryRange: '75–95',
        tags: ['Next.js', 'Go', 'Munich'],
        recruiterName: 'Klaus Schmidt',
        status: JobStatus.NEW,
        notes: '',
    },
    {
        company: 'Zalando',
        title: 'Frontend Engineer',
        location: 'Berlin',
        salaryRange: '70–90',
        tags: ['Vue', 'TypeScript', 'Berlin'],
        recruiterName: 'Lisa Bauer',
        status: JobStatus.SAVED,
        notes: 'Interesting design system work. Large-scale e-commerce frontend.',
    },
    {
        company: 'Delivery Hero',
        title: 'React Native Developer',
        location: 'Berlin',
        salaryRange: '65–85',
        tags: ['React Native', 'TypeScript', 'Berlin'],
        recruiterName: 'Max Fischer',
        status: JobStatus.INTERVIEW,
        notes: 'Technical interview scheduled. Focus on mobile performance and offline support.',
    },
    {
        company: 'Airbnb',
        title: 'UI Engineer',
        location: 'Remote',
        salaryRange: '85–105',
        tags: ['React', 'Design Systems', 'Remote'],
        recruiterName: 'Tom Klein',
        status: JobStatus.NEW,
        notes: '',
    },
];

const jobSeed = (userId: string): Promise<Job[]> =>
    Promise.all(
        jobsData.map((job) =>
            prisma.job.create({
                data: {
                    ...job,
                    userId,
                },
            }),
        ),
    );

export { jobSeed };
